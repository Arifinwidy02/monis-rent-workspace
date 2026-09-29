"use client";

import { useState } from "react";
import Link from "next/link";
import { Dices, RotateCcw, Zap } from "lucide-react";
import type { ProductCategory } from "@/data/products";
import { PRESETS } from "@/data/products";
import { useMonthlyTotal, useWorkspaceStore } from "@/store/workspaceStore";
import WorkspaceScene from "./WorkspaceScene";
import CategoryTabs from "./CategoryTabs";
import ProductSelector from "./ProductSelector";
import WorkspaceSummary from "./WorkspaceSummary";

export default function WorkspaceBuilder() {
  const [category, setCategory] = useState<ProductCategory>("desk");
  const { applyPreset, surpriseMe, resetWorkspace } = useWorkspaceStore();
  const total = useMonthlyTotal();
  const [notice, setNotice] = useState<string | null>(null);

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(null), 2400);
  };

  return (
    <div className="pb-28 lg:pb-0">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[560px]">
          <p className="font-serif text-[26px] italic leading-tight text-[#5F705B] md:text-[30px]">
            Build your perfect workspace
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#6F6F68]">
            Pick your favorite pieces and see your workspace come to life
            instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                applyPreset({
                  deskId: p.state.deskId,
                  chairId: p.state.chairId,
                  monitorIds: [...p.state.monitorIds],
                  lightingIds: [...p.state.lightingIds],
                  accessoryIds: [...p.state.accessoryIds],
                });
                flash(`${p.name} preset applied.`);
              }}
              title={p.blurb}
              className="min-h-[44px] rounded-full border border-[#DDDAD2] bg-white px-4 text-[12px] font-semibold text-[#252525] transition hover:border-[#5F705B] hover:text-[#5F705B] focus-visible:outline-2 focus-visible:outline-[#5F705B]"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => {
              surpriseMe();
              flash("Here is something you might like.");
            }}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#252525] px-4 text-[12px] font-semibold text-white transition hover:bg-black focus-visible:outline-2 focus-visible:outline-[#5F705B]"
          >
            <Dices className="h-3.5 w-3.5" /> Surprise me
          </button>
          <button
            onClick={() => {
              resetWorkspace();
              flash("Workspace cleared. Start with a desk.");
            }}
            aria-label="Reset workspace"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#DDDAD2] bg-white px-4 text-[12px] font-semibold text-[#6F6F68] transition hover:text-[#252525] focus-visible:outline-2 focus-visible:outline-[#5F705B]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#5F705B] px-3 py-1.5 text-[12px] font-medium text-white"
        >
          <Zap className="h-3.5 w-3.5" /> {notice}
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <WorkspaceScene />
          <div className="mt-4 rounded-2xl border border-[#DDDAD2] bg-white p-4 shadow-[0_8px_30px_rgba(37,37,37,0.06)] md:p-5">
            <CategoryTabs active={category} onChange={setCategory} />
            <div className="mt-5">
              <ProductSelector key={category} category={category} />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-5">
            <WorkspaceSummary editable />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DDDAD2] bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
          <p className="text-lg font-bold text-[#252525]">
            €{total}{" "}
            <span className="text-[12px] font-normal text-[#6F6F68]">
              / month
            </span>
          </p>
          <Link
            href="/checkout"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-[#5F705B] px-5 text-[13px] font-semibold text-white"
          >
            Review setup
          </Link>
        </div>
      </div>
    </div>
  );
}
