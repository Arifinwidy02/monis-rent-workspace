"use client";

import { Armchair, Monitor, Table } from "lucide-react";
/* Disabled for future development: Lamp, Package icons (lighting + extras tabs) */
import type { ProductCategory } from "@/data/products";

const TABS: { id: ProductCategory; label: string; icon: typeof Table }[] = [
  { id: "desk", label: "Desk", icon: Table },
  { id: "chair", label: "Chair", icon: Armchair },
  { id: "monitor", label: "Monitors", icon: Monitor },
  /* Disabled for future development:
  { id: "lighting", label: "Lighting", icon: Lamp },
  { id: "accessory", label: "Extras", icon: Package },
  */
];

export default function CategoryTabs({
  active,
  onChange,
}: {
  active: ProductCategory;
  onChange: (c: ProductCategory) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="flex gap-1 overflow-x-auto rounded-xl bg-[#EDEAE2] p-1"
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#5F705B] ${
              isActive
                ? "bg-[#5F705B] text-white shadow"
                : "text-[#6F6F68] hover:bg-white/70 hover:text-[#252525]"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
