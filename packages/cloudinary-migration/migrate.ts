import { v2 as cloudinary } from "cloudinary";
import { glob } from "glob";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

// Parse command line arguments for --location flag
const args = process.argv.slice(2);
const locationArg = args.find((arg) => arg.startsWith("--location="));
const targetLocation = locationArg ? locationArg.split("=")[1] : null;

// Build search pattern based on --location flag
const getSearchPattern = () => {
  if (targetLocation) {
    // If location is provided, search only in that specific directory
    return `../../apps/web/${targetLocation}/**/*.{ts,tsx,js,jsx,json,css}`;
  }
  // Default: search all files in apps/web
  return "../../apps/web/**/*.{ts,tsx,js,jsx,json,css}";
};

const CONFIG = {
  cloud_name: process.env.NEW_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEW_CLOUDINARY_API_KEY,
  api_secret: process.env.NEW_CLOUDINARY_API_SECRET,
  searchPattern: getSearchPattern(),
  urlRegex:
    /https?:\/\/res\.cloudinary\.com\/[\w-]+\/image\/upload\/v\d+\/([\w-\/]+)\.(jpg|jpeg|png|webp|svg|gif)/g,
};

if (!CONFIG.cloud_name || !CONFIG.api_key || !CONFIG.api_secret) {
  console.error(
    "❌ Missing Cloudinary configuration. Please set NEW_CLOUDINARY_CLOUD_NAME, NEW_CLOUDINARY_API_KEY, and NEW_CLOUDINARY_API_SECRET in .env"
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CONFIG.cloud_name,
  api_key: CONFIG.api_key,
  api_secret: CONFIG.api_secret,
});

const getLogFileName = () => {
  let count = 1;
  while (fs.existsSync(`log${count}.txt`)) {
    count++;
  }
  return `log${count}.txt`;
};

const LOG_FILE = getLogFileName();

const log = (
  message: string,
  type: "INFO" | "SUCCESS" | "ERROR" | "HEADER" | "FOOTER" = "INFO"
) => {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let formattedMessage = "";

  if (type === "HEADER" || type === "FOOTER") {
    formattedMessage = `\n${"=".repeat(50)}\n[${timestamp}] ${message}\n${"=".repeat(50)}\n`;
  } else {
    formattedMessage = `[${timestamp}] [${type}] ${message}\n`;
  }

  fs.appendFileSync(LOG_FILE, formattedMessage);

  console.log(formattedMessage.trim());
};

interface MigrationResult {
  oldUrl: string;
  newUrl: string;
  status: "SUCCESS" | "FAILURE";
  error?: string;
}

async function migrate() {
  log("Starting Cloudinary Migration", "HEADER");

  if (targetLocation) {
    log(`Running in TARGETED mode for directory: ${targetLocation}`);
  } else {
    log("Running FULL SCAN mode (all files in apps/web)");
  }

  // 1. Find files
  log(`Scanning for files in ${CONFIG.searchPattern}...`);
  const files = await glob(CONFIG.searchPattern, { ignore: "node_modules/**" });
  log(`Found ${files.length} files to scan.`);

  const migrationMap = new Map<string, MigrationResult>();
  const uniqueUrls = new Set<string>();

  // 2. Scan for URLs
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = CONFIG.urlRegex.exec(content)) !== null) {
      uniqueUrls.add(match[0]);
    }
  }

  log(`Found ${uniqueUrls.size} unique Cloudinary URLs to migrate.`);

  // 3. Migrate Images
  let successCount = 0;
  let failCount = 0;

  for (const oldUrl of uniqueUrls) {
    try {
      log(`Migrating: ${oldUrl}`);

      const urlParts = oldUrl.split("/upload/");
      const pathPart = urlParts[1];
      const versionMatch = pathPart.match(/^v\d+\/(.+)\.(.+)$/);

      let publicId = "";
      let folder = "";

      if (versionMatch) {
        const fullPath = versionMatch[1];
        const pathSegments = fullPath.split("/");
        const filename = pathSegments.pop();
        folder = pathSegments.join("/");
        publicId = filename || "image";
      } else {
        publicId = pathPart.split(".")[0];
      }

      const uploadResult = await cloudinary.uploader.upload(oldUrl, {
        folder: folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "auto",
      });

      const newUrl = uploadResult.secure_url;

      migrationMap.set(oldUrl, {
        oldUrl,
        newUrl,
        status: "SUCCESS",
      });

      log(`Migrated: ${oldUrl} -> ${newUrl}`, "SUCCESS");
      successCount++;
    } catch (error: any) {
      migrationMap.set(oldUrl, {
        oldUrl,
        newUrl: "",
        status: "FAILURE",
        error: error.message,
      });
      log(`Failed to migrate: ${oldUrl}. Error: ${error.message}`, "ERROR");
      failCount++;
    }
  }

  if (successCount > 0) {
    log("Starting file replacements...");
    for (const file of files) {
      let content = fs.readFileSync(file, "utf-8");
      let hasChanges = false;

      if (!content.includes("res.cloudinary.com")) continue;

      for (const [oldUrl, result] of migrationMap.entries()) {
        if (result.status === "SUCCESS" && content.includes(oldUrl)) {
          content = content.replaceAll(oldUrl, result.newUrl);
          hasChanges = true;
        }
      }

      if (hasChanges) {
        fs.writeFileSync(file, content, "utf-8");
        log(`Updated references in: ${file}`);
      }
    }
  } else {
    log("No successful migrations, skipping file replacements.");
  }

  log(
    `Migration Completed. Total: ${uniqueUrls.size}, Success: ${successCount}, Failed: ${failCount}`,
    "FOOTER"
  );
}

migrate().catch((err) => {
  console.error("Unhandled error:", err);
  log(`Unhandled error: ${err.message}`, "ERROR");
});
