"use client";

import { Check } from "lucide-react";
import type { Product } from "@/data/products";
import { CatalogThumb } from "./scene-art";

export default function ProductCard({
  product,
  selected,
  onSelect,
  multi = false,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border bg-white text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5F705B] active:scale-[0.98] sm:w-auto sm:shrink ${
        selected
          ? "border-[#5F705B] shadow-[0_8px_30px_rgba(95,112,91,0.18)]"
          : "border-[#DDDAD2] hover:border-[#A8A69E] hover:shadow-[0_8px_30px_rgba(37,37,37,0.06)]"
      }`}
    >
      <span
        className={`relative block h-[130px] w-full overflow-hidden ${
          selected ? "bg-[#EDF0EA]" : "bg-[#F5F3EE]"
        }`}
      >
        <CatalogThumb id={product.id} category={product.category} />
        {selected && (
          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5F705B] text-white">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col gap-0.5 p-3">
        <span className="text-[13px] font-semibold text-[#252525]">
          {product.name}
        </span>
        <span className="text-[13px] text-[#252525]">
          €{product.priceMonthly}{" "}
          <span className="font-normal text-[#A8A69E]">/ month</span>
        </span>
        {product.description && (
          <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#6F6F68]">
            {product.description}
          </span>
        )}
        <span
          className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] ${
            selected ? "text-[#5F705B]" : "text-[#A8A69E] group-hover:text-[#6F6F68]"
          }`}
        >
          {selected ? (multi ? "Added" : "Selected") : multi ? "Add" : "Select"}
        </span>
      </span>
    </button>
  );
}
