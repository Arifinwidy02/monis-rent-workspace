"use client";

import { CATEGORY_META, productsByCategory, type ProductCategory } from "@/data/products";
import { useWorkspaceStore } from "@/store/workspaceStore";
import ProductCard from "./ProductCard";

export default function ProductSelector({ category }: { category: ProductCategory }) {
  const store = useWorkspaceStore();
  const products = productsByCategory(category);
  const meta = CATEGORY_META[category];

  const isSelected = (id: string) => {
    if (category === "desk") return store.deskId === id;
    if (category === "chair") return store.chairId === id;
    if (category === "monitor") return store.monitorIds.includes(id);
    if (category === "lighting") return store.lightingIds.includes(id);
    return store.accessoryIds.includes(id);
  };

  const handle = (id: string) => {
    if (category === "desk") store.selectDesk(id);
    else if (category === "chair") store.selectChair(id);
    else if (category === "monitor") store.toggleMonitor(id);
    else if (category === "lighting") store.toggleLighting(id);
    else store.toggleAccessory(id);
  };

  const multi = category === "monitor" || category === "lighting" || category === "accessory";

  return (
    <section aria-label={meta.label}>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#252525]">{meta.label}</h2>
          <p className="text-[13px] text-[#6F6F68]">{meta.hint}</p>
        </div>
        {multi && (
          <p className="hidden text-[11px] text-[#A8A69E] sm:block">
            Pick as many as you like.
          </p>
        )}
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={isSelected(p.id)}
            onSelect={() => handle(p.id)}
            multi={multi}
          />
        ))}
      </div>
    </section>
  );
}
