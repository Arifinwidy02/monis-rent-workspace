"use client";

import Link from "next/link";
import { ArrowRight, Pencil } from "lucide-react";
import { productById } from "@/data/products";
import { useMonthlyTotal, useWorkspaceStore } from "@/store/workspaceStore";
import { CatalogThumb } from "./scene-art";

export default function WorkspaceSummary({ editable = false }: { editable?: boolean }) {
  const { deskId, chairId, monitorIds, lightingIds, accessoryIds } = useWorkspaceStore();
  const total = useMonthlyTotal();
  const ids = [deskId, chairId, ...monitorIds, ...lightingIds, ...accessoryIds].filter(
    Boolean
  ) as string[];

  return (
    <aside className="flex flex-col rounded-2xl border border-[#DDDAD2] bg-white p-5 shadow-[0_8px_30px_rgba(37,37,37,0.06)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[#252525]">Your Workspace</h2>
        {editable && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F3EE] px-2.5 py-1 text-[11px] font-semibold text-[#6F6F68]">
            <Pencil className="h-3 w-3" /> Live
          </span>
        )}
      </div>
      <p className="mb-4 text-[12px] text-[#6F6F68]">
        A focused setup for deep work and productivity.
      </p>

      <ul className="flex flex-col gap-2.5">
        {ids.length === 0 && (
          <li className="rounded-xl bg-[#F5F3EE] p-4 text-[13px] text-[#6F6F68]">
            Nothing selected yet. Pick a desk to begin.
          </li>
        )}
        {ids.map((id) => {
          const p = productById(id);
          if (!p) return null;
          return (
            <li
              key={id}
              className="flex items-center gap-3 rounded-xl border border-[#F0EEE8] bg-white p-2 pr-3"
            >
              <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F5F3EE]">
                <CatalogThumb id={p.id} category={p.category} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-[#252525]">
                  {p.name}
                </span>
                <span className="block text-[12px] text-[#6F6F68]">
                  €{p.priceMonthly} <span className="text-[#A8A69E]">/ month</span>
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-baseline justify-between border-t border-[#DDDAD2] pt-4">
        <span className="text-[13px] font-semibold text-[#252525]">Monthly total</span>
        <span className="text-2xl font-bold text-[#252525]">
          €{total} <span className="text-sm font-normal text-[#6F6F68]">/ month</span>
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#5F705B] px-6 text-[14px] font-semibold text-white transition hover:bg-[#4E5D4B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5F705B] active:translate-y-[1px]"
      >
        Continue to Review <ArrowRight className="h-4 w-4" />
      </Link>
      <p className="mt-2 text-center text-[11px] text-[#A8A69E]">
        Includes delivery and setup in Bali.
      </p>
    </aside>
  );
}
