export type ProductCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "lighting"
  | "accessory";

export type SceneTransform = {
  x: number; // normalized 0-100, left
  y: number; // normalized 0-100, top
  width: number; // % of scene width
  zIndex: number;
};

export type LayerPosition = { x: number; y: number };

export type SceneAnchors = {
  chair?: { x: number; y: number };
  monitor?: { x: number; y: number };
  lighting?: { x: number; y: number };
  accessory?: { x: number; y: number };
};

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  priceMonthly: number;
  catalogImage: string; // role: product cards / selection UI
  sceneImage: string; // role: interactive workspace scene layer
  description?: string;
  tags?: string[];
  scene: SceneTransform;
  anchors?: SceneAnchors;
  workspaceScene?: string;
  sceneSize?: { width: number; height: number };
  finish?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "electrical-adjustable-desk",
    name: "Electric Adjustable Desk",
    category: "desk",
    priceMonthly: 65,
    catalogImage: "/assets/products/desks/electrical-adjustable.avif",
    sceneImage:
      "/assets/scene/workspaces/electrical-adjustable__default-chair.webp",
    workspaceScene:
      "/assets/scene/workspaces/electrical-adjustable__default-chair.webp",
    description: "Electric height adjustment, black top, silver legs.",
    tags: ["Bestseller", "Adjustable"],
    finish: "black",
    scene: { x: 35, y: 35, width: 40, zIndex: 20 },
    anchors: {
      chair: { x: 50, y: 91 },
      monitor: { x: 10, y: 26 },
      lighting: { x: 72, y: 29 },
      accessory: { x: 30, y: 26 },
    },
  },
  {
    id: "mechanical-adjustable-desk",
    name: "Manual Adjustable Desk",
    category: "desk",
    priceMonthly: 52,
    catalogImage: "/assets/products/desks/mechanical-adjustable.avif",
    sceneImage:
      "/assets/scene/workspaces/mechanical-adjustable__default-chair.webp",
    workspaceScene:
      "/assets/scene/workspaces/mechanical-adjustable__default-chair.webp",
    description: "Manual crank adjustment, white top, black legs.",
    tags: ["Value"],
    finish: "white",
    scene: { x: 35, y: 35, width: 40, zIndex: 20 },

    anchors: {
      chair: { x: 50, y: 91 },
      monitor: { x: 50, y: 26 },
      lighting: { x: 72, y: 29 },
      accessory: { x: 30, y: 26 },
    },
  },
  {
    id: "dual-motor-standar-desk",
    name: "Dual Motor Standing Desk",
    category: "desk",
    priceMonthly: 78,
    catalogImage: "/assets/products/desks/dual-motor-standard.avif",
    sceneImage:
      "/assets/scene/workspaces/dual-motor-standard__default-chair.webp",
    workspaceScene:
      "/assets/scene/workspaces/dual-motor-standard__default-chair.webp",
    description: "Dual motor lift, walnut top, quiet and stable.",
    tags: ["Premium"],
    finish: "walnut",
    scene: { x: 35, y: 35, width: 40, zIndex: 20 },

    anchors: {
      chair: { x: 50, y: 91 },
      monitor: { x: 50, y: 26 },
      lighting: { x: 72, y: 29 },
      accessory: { x: 30, y: 26 },
    },
  },

  {
    id: "default-chair",
    name: "Default Chair",
    category: "chair",
    priceMonthly: 38,
    catalogImage: "/assets/products/chairs/default.webp",
    sceneImage: "/assets/products/chairs/default.webp",
    description: "Black ergonomic office chair, mesh back, all-day comfort.",
    tags: ["Comfort"],
    scene: { x: 50, y: 92, width: 26, zIndex: 40 },
  },
  {
    id: "gaming-chair",
    name: "Gaming Chair",
    category: "chair",
    priceMonthly: 45,
    catalogImage: "/assets/products/chairs/gaming.webp",
    sceneImage: "/assets/products/chairs/gaming.webp",
    description: "High-back gaming chair, black and white, extra cushion.",
    tags: ["Gaming"],
    scene: { x: 50, y: 92, width: 26, zIndex: 40 },
  },

  {
    id: "24-full-hd",
    name: '24" Full HD Office Monitor',
    category: "monitor",
    priceMonthly: 25,
    catalogImage: "/assets/products/monitors/24-full-hd-office.webp",
    sceneImage: "/assets/scene/monitors/24-full-hd-office.png",
    description: '24" Full HD, crisp everyday office screen.',
    tags: ["Value"],
    scene: { x: 62, y: 42, width: 14.5, zIndex: 10 },
    sceneSize: { width: 498, height: 410 },
  },
  {
    id: "32-lg-fine-art",
    name: '32" LG Fine Art Display',
    category: "monitor",
    priceMonthly: 39,
    catalogImage: "/assets/products/monitors/32-lg-fine-art.webp",
    sceneImage: "/assets/scene/monitors/32-lg-fine-art.png",
    description: '32" color-rich display, great for visual work.',
    tags: ["Creative"],
    scene: { x: 62, y: 42, width: 12.5, zIndex: 10 },
    sceneSize: { width: 367, height: 351 },
  },
  {
    id: "34-4k-gaming",
    name: '34" 4K Gaming Monitor',
    category: "monitor",
    priceMonthly: 55,
    catalogImage: "/assets/products/monitors/34-4k-gaming.webp",
    sceneImage: "/assets/scene/monitors/34-4k-gaming.png",
    description: '34" ultrawide 4K, immersive screen for deep work.',
    tags: ["Deep Focus"],
    scene: { x: 62, y: 42, width: 18, zIndex: 10 },
    sceneSize: { width: 636, height: 410 },
  },

  /* Disabled for future development: lighting
  {
    id: "desk-lamp",
    name: "Desk Lamp",
    category: "lighting",
    priceMonthly: 12,
    catalogImage: "/assets/products/lighting/desk-lamp.png",
    sceneImage: "/assets/scene/lighting/desk-lamp.webp",
    description: "Articulated arm, warm 2700K bulb.",
    scene: { x: 72, y: 29, width: 12, zIndex: 35 },
  },
  {
    id: "floor-lamp",
    name: "Floor Lamp",
    category: "lighting",
    priceMonthly: 16,
    catalogImage: "/assets/products/lighting/floor-lamp.png",
    sceneImage: "/assets/scene/lighting/floor-lamp.webp",
    description: "Tall rattan floor lamp, soft evening glow.",
    tags: ["Warm"],
    scene: { x: 86, y: 55, width: 14, zIndex: 35 },
  },

  Disabled for future development: extras
  {
    id: "plant",
    name: "Plant",
    category: "accessory",
    priceMonthly: 8,
    catalogImage: "/assets/products/extras/plant.png",
    sceneImage: "/assets/scene/extras/plant.webp",
    description: "Potted monstera, easy to keep alive.",
    scene: { x: 30, y: 26, width: 13, zIndex: 35 },
  },
  {
    id: "organizer",
    name: "Desk Organizer",
    category: "accessory",
    priceMonthly: 6,
    catalogImage: "/assets/products/extras/organizer.png",
    sceneImage: "/assets/scene/extras/organizer.webp",
    description: "Oak tray, pen cup and notebook.",
    scene: { x: 62, y: 33, width: 9, zIndex: 35 },
  },
  {
    id: "monitor-arm",
    name: "Monitor Arm",
    category: "accessory",
    priceMonthly: 10,
    catalogImage: "/assets/products/extras/monitor-arm.png",
    sceneImage: "/assets/scene/extras/monitor-arm.webp",
    description: "Single gas arm, frees up desk space.",
    scene: { x: 50, y: 32, width: 8, zIndex: 28 },
  },
  */
];

export const productById = (id: string | null | undefined) =>
  PRODUCTS.find((p) => p.id === id);

export const productsByCategory = (category: ProductCategory) =>
  PRODUCTS.filter((p) => p.category === category);

export const priceOf = (id: string | null | undefined) =>
  productById(id)?.priceMonthly ?? 0;

export const CATEGORY_META: Record<
  ProductCategory,
  { label: string; hint: string }
> = {
  desk: { label: "Desks", hint: "Choose the perfect desk for your workflow." },
  chair: { label: "Chairs", hint: "Comfort decides how long you can focus." },
  monitor: { label: "Monitors", hint: "One screen or two? You decide." },
  lighting: { label: "Lighting", hint: "Warm light for late Bali evenings." },
  accessory: { label: "Extras", hint: "Make it yours with small touches." },
};

export const PRESETS = [
  {
    id: "deep-focus",
    name: "Deep Focus",
    blurb: "For long, concentrated work sessions.",
    state: {
      deskId: "electrical-adjustable-desk",
      chairId: "default-chair",
      monitorIds: ["34-4k-gaming"],
      lightingIds: [],
      accessoryIds: [],
    },
  },
  {
    id: "creative",
    name: "Creative",
    blurb: "Flexible, visual, a little warmer.",
    state: {
      deskId: "dual-motor-standar-desk",
      chairId: "gaming-chair",
      monitorIds: ["32-lg-fine-art"],
      lightingIds: [],
      accessoryIds: [],
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    blurb: "Distraction-free and light.",
    state: {
      deskId: "mechanical-adjustable-desk",
      chairId: "default-chair",
      monitorIds: ["24-full-hd"],
      lightingIds: [],
      accessoryIds: [],
    },
  },
] as const;
