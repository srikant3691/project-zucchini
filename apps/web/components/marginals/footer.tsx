"use client";
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { footerLinks, footerImages } from "@/config/marginals/footer";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon className="w-6 h-6" />,
  Instagram: <Instagram className="w-6 h-6" />,
};

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer className={cn("relative w-full font-inria overflow-hidden z-50 bg-black")}>
      <div className="absolute inset-0 bg-black rounded-t-[80px] border-2 border-white overflow-hidden ">
        <div className="relative flex justify-between w-full h-full footer-pattern ">
          <div className="absolute -translate-x-1/2  scale-100 md:scale-150 flex items-center">
            <Image
              src={footerImages.illustration}
              alt="Footer Background"
              width={isMobile ? 400 : 400}
              height={isMobile ? 400 : 400}
              className=""
              priority={false}
            />
          </div>
          <div className="absolute right-0 translate-x-1/2 scale-100 md:scale-150 flex items-center">
            <Image
              src={footerImages.illustration}
              alt="Footer Background"
              width={isMobile ? 400 : 400}
              height={isMobile ? 400 : 400}
              className="rotate-180"
              priority={false}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-center gap-6 mb-6">
          {footerLinks.socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-xs md:text-xl font-semibold uppercase tracking-wider"
            >
              {socialIcons[social.label]}
              <span>{social.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center my-8 md:my-12">
          <div className="relative w-full">
            <Image
              src={footerImages.logo}
              alt="Nitrutsav 2026 Logo"
              className="object-contain w-full h-60 md:h-80"
              priority
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-8 text-white text-xs md:text-lg max-w-[90rem] mx-auto px-5">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
            {footerLinks.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:underline underline-offset-4 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="flex items-center justify-center md:justify-end gap-1">
              Crafted with{" "}
              <span className="text-red-500" aria-label="love">
                ❤️
              </span>{" "}
              by{" "}
              <Link
                href={footerLinks.credits.teamLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline underline-offset-4"
              >
                {footerLinks.credits.team}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
