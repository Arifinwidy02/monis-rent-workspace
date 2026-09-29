import Image from "next/image";

const DESK_CATALOG_PHOTOS: Record<string, { src: string; width: number; height: number }> = {
  "electrical-adjustable-desk": {
    src: "/assets/products/desks/electrical-adjustable.avif",
    width: 920,
    height: 920,
  },
  "mechanical-adjustable-desk": {
    src: "/assets/products/desks/mechanical-adjustable.avif",
    width: 920,
    height: 920,
  },
  "dual-motor-standar-desk": {
    src: "/assets/products/desks/dual-motor-standard.avif",
    width: 900,
    height: 900,
  },
};

export function DeskCatalogThumb({ id }: { id: string }) {
  const photo = DESK_CATALOG_PHOTOS[id];
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt=""
        width={photo.width}
        height={photo.height}
        className="h-full w-full object-cover"
      />
    );
  }
  return null;
}

const CHAIR_CATALOG_PHOTOS: Record<string, { src: string; width: number; height: number }> = {
  "default-chair": {
    src: "/assets/products/chairs/default.webp",
    width: 933,
    height: 1478,
  },
  "gaming-chair": {
    src: "/assets/products/chairs/gaming.webp",
    width: 961,
    height: 1500,
  },
};

export function ChairCatalogThumb({ id }: { id: string }) {
  const photo = CHAIR_CATALOG_PHOTOS[id];
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt=""
        width={photo.width}
        height={photo.height}
        className="h-full w-full object-contain"
      />
    );
  }
  return null;
}

const MONITOR_CATALOG_PHOTOS: Record<string, { src: string; width: number; height: number }> = {
  "24-full-hd": {
    src: "/assets/products/monitors/24-full-hd-office.webp",
    width: 690,
    height: 690,
  },
  "32-lg-fine-art": {
    src: "/assets/products/monitors/32-lg-fine-art.webp",
    width: 500,
    height: 500,
  },
  "34-4k-gaming": {
    src: "/assets/products/monitors/34-4k-gaming.webp",
    width: 690,
    height: 690,
  },
};

export function MonitorCatalogThumb({ id }: { id: string }) {
  const photo = MONITOR_CATALOG_PHOTOS[id];
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt=""
        width={photo.width}
        height={photo.height}
        className="h-full w-full object-contain"
      />
    );
  }
  return null;
}

export function LampScene({ id }: { id: string }) {
  if (id === "floor-lamp")
    return (
      <svg viewBox="0 0 120 240" className="h-auto w-full drop-shadow-[0_10px_18px_rgba(37,37,37,0.2)]">
        <line x1="60" y1="90" x2="60" y2="220" stroke="#6B5B45" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="60" cy="224" rx="30" ry="9" fill="#4A4033" />
        <path d="M30 88 Q60 40 90 88 Q60 100 30 88" fill="#E4C98F" stroke="#C9A869" />
        <ellipse cx="60" cy="90" rx="30" ry="7" fill="#FFE9A8" opacity="0.9" />
        <ellipse cx="60" cy="130" rx="34" ry="46" fill="#FFD98A" opacity="0.18" />
      </svg>
    );
  return (
    <svg viewBox="0 0 140 140" className="h-auto w-full drop-shadow-[0_8px_14px_rgba(37,37,37,0.22)]">
      <ellipse cx="100" cy="126" rx="30" ry="7" fill="#4A4033" />
      <path d="M100 124 L78 60 L44 44" stroke="#E8E2D4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M100 124 L78 60 L44 44" stroke="#B9B2A2" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="78" cy="60" r="6" fill="#8A8272" />
      <path d="M22 30 L52 52 L38 66 L12 44 Z" fill="#F2EEE3" stroke="#CFC8B6" />
      <ellipse cx="27" cy="52" rx="12" ry="7" fill="#FFE9A8" opacity="0.95" transform="rotate(-24 27 52)" />
      <ellipse cx="34" cy="66" rx="22" ry="30" fill="#FFD98A" opacity="0.16" />
    </svg>
  );
}

export function PlantScene() {
  return (
    <svg viewBox="0 0 120 150" className="h-auto w-full drop-shadow-[0_8px_14px_rgba(37,37,37,0.2)]">
      <path d="M35 96 Q30 60 14 44 Q38 44 44 66 Q46 40 60 22 Q66 46 62 68 Q78 48 96 52 Q84 68 76 78 Q94 78 100 92 Q80 100 60 96 Z"
        fill="#4E7A51" stroke="#3C6040" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 96 L60 60" stroke="#3C6040" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 98 L82 98 L76 138 L44 138 Z" fill="#C89D6A" stroke="#A67C4E" />
      <rect x="38" y="98" width="44" height="8" fill="#B78D5C" />
    </svg>
  );
}

export function OrganizerScene() {
  return (
    <svg viewBox="0 0 120 70" className="h-auto w-full drop-shadow-[0_6px_10px_rgba(37,37,37,0.18)]">
      <rect x="10" y="44" width="100" height="16" rx="3" fill="#C89D6A" stroke="#A67C4E" />
      <rect x="18" y="18" width="22" height="28" rx="2" fill="#4A4033" />
      <line x1="24" y1="18" x2="22" y2="6" stroke="#252525" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="18" x2="30" y2="4" stroke="#5F705B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="18" x2="39" y2="7" stroke="#C89D6A" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="52" y="28" width="34" height="18" rx="2" fill="#F2EEE3" stroke="#DDDAD2" />
      <line x1="57" y1="34" x2="81" y2="34" stroke="#DDDAD2" strokeWidth="2" />
      <line x1="57" y1="39" x2="76" y2="39" stroke="#DDDAD2" strokeWidth="2" />
    </svg>
  );
}

export function MonitorArmScene() {
  return (
    <svg viewBox="0 0 60 80" className="h-auto w-full">
      <rect x="22" y="60" width="16" height="14" rx="2" fill="#333" />
      <line x1="30" y1="60" x2="30" y2="18" stroke="#444" strokeWidth="6" strokeLinecap="round" />
      <circle cx="30" cy="36" r="7" fill="#555" />
    </svg>
  );
}

export function CatalogThumb({ id, category }: { id: string; category: string }) {
  const wrap = "h-full w-full";
  if (category === "desk") return <div className={wrap}><DeskCatalogThumb id={id} /></div>;
  if (category === "chair") {
    return (
      <div className={`${wrap} mx-auto max-w-[62%] py-1`}>
        <ChairCatalogThumb id={id} />
      </div>
    );
  }
  if (category === "monitor")
    return (
      <div className={`${wrap} flex items-center px-2`}>
        <MonitorCatalogThumb id={id} />
      </div>
    );
  if (category === "lighting")
    return (
      <div className={`${wrap} mx-auto max-w-[46%] py-1`}>
        <LampScene id={id} />
      </div>
    );
  if (id === "plant")
    return (
      <div className={`${wrap} mx-auto max-w-[42%] py-1`}>
        <PlantScene />
      </div>
    );
  if (id === "organizer")
    return (
      <div className={`${wrap} flex items-center px-3`}>
        <OrganizerScene />
      </div>
    );
  return (
    <div className={`${wrap} flex items-center justify-center px-6`}>
      <MonitorArmScene />
    </div>
  );
}

export function SceneLayer({ id, category }: { id: string; category: string }) {
  if (category === "desk") return null; // desks use pre-composed workspaceScene photos
  if (category === "chair") return null; // chairs use pre-composed workspaceScene photos
  if (category === "monitor") return null; // monitors stay selected in state, scene is pre-composed
  if (category === "lighting") return <LampScene id={id} />;
  if (id === "plant") return <PlantScene />;
  if (id === "organizer") return <OrganizerScene />;
  if (id === "monitor-arm") return <MonitorArmScene />;
  return null;
}
