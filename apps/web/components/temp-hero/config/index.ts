// Layer images from public/hero folder
export const HERO_IMAGES = {
  girl: "/hero/with-peacock.png",
  // girl: "https://www.figma.com/api/mcp/asset/419059b6-f45f-497c-95b0-855e4a07c551",
  background: "/hero/layer2.png", // Background cosmic frame
  peacockBehind: "https://www.figma.com/api/mcp/asset/956c785f-f510-493e-a8e9-0f83edb9a487", // Peacock feathers behind girl
  owlLeft: "https://www.figma.com/api/mcp/asset/ebd34185-d2b9-4e83-97ef-8e94c8117c07", // Left owl with feathers
  owlRight: "https://www.figma.com/api/mcp/asset/d71a9bfa-9fe8-4b40-ba68-4917214da112", // Right owl decoration
  peacockLeft: "https://www.figma.com/api/mcp/asset/aaeebbb5-39aa-4509-a203-90c5d19386c5", // Peacock feathers left
  flowersTopLeft: "https://www.figma.com/api/mcp/asset/6290ce3f-2188-48b2-aebc-0c45fdf1a40e", // Flowers top left
  flowersTopRight: "https://www.figma.com/api/mcp/asset/474108c6-df75-4214-9dc8-6ee57f0567d9", // Flowers top right
  logo: "/hero/logo.svg", // Nitrutsav logo
} as const;

// Parallax multipliers for mouse movement (in vw units to match original)
export const PARALLAX_MOUSE = {
  background: { x: 0.3, y: 0.15 },
  girl: { x: 2, y: 0.9 },
  peacockBehind: { x: 1.8, y: 0.8 },
  owls: { x: 1.5, y: 0.8 },
  peacockFeathers: { x: 1.2, y: 0.6 },
  owlRight: { x: 1.1, y: 0.5 },
  flowers: { x: 1.2, y: 0.6 },
  logo: { x: 0.6, y: 0.3 },
  lightStrings: { x: 15, y: 10 },
} as const;

// Parallax multipliers for scroll
export const PARALLAX_SCROLL = {
  background: 0.1,
  girl: 0.35,
  peacockBehind: 0.3,
  owls: 0.2,
  flowers: 0.25,
  logo: 0.25,
  lightStrings: 0.15,
} as const;

// Transition durations (in seconds)
export const TRANSITIONS = {
  background: 0.15,
  girl: 0.15,
  peacockBehind: 0.15,
  owls: 0.15,
  flowers: 0.15,
  logo: 0.2,
  lightStrings: 0.25,
} as const;
