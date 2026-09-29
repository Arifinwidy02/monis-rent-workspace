"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { priceOf, productById, type LayerPosition } from "@/data/products";

export type WorkspaceState = {
  deskId: string | null;
  chairId: string | null;
  monitorIds: string[];
  monitorPositions: Record<string, LayerPosition>;
  lightingIds: string[];
  accessoryIds: string[];
  selectDesk: (id: string) => void;
  selectChair: (id: string) => void;
  toggleMonitor: (id: string) => void;
  setMonitorPos: (id: string, pos: LayerPosition) => void;
  toggleLighting: (id: string) => void;
  toggleAccessory: (id: string) => void;
  resetWorkspace: () => void;
  applyPreset: (s: {
    deskId: string | null;
    chairId: string | null;
    monitorIds: string[];
    lightingIds: string[];
    accessoryIds: string[];
  }) => void;
  surpriseMe: () => void;
};

const DEFAULT_STATE = {
  deskId: "electrical-adjustable-desk",
  chairId: "default-chair",
  monitorIds: ["34-4k-gaming"],
  monitorPositions: {},
  lightingIds: [],
  accessoryIds: [],
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      selectDesk: (id) => set({ deskId: id }),
      selectChair: (id) => set({ chairId: id }),
      setMonitorPos: (id, pos) =>
        set((s) => ({ monitorPositions: { ...s.monitorPositions, [id]: pos } })),
      toggleMonitor: (id) =>
        set((s) => ({
          monitorIds: s.monitorIds.includes(id)
            ? s.monitorIds.filter((m) => m !== id)
            : [...s.monitorIds.filter((m) => m !== "24-full-hd" && m !== "32-lg-fine-art" && m !== "34-4k-gaming"), id],
        })),
      toggleLighting: (id) =>
        set((s) => ({
          lightingIds: s.lightingIds.includes(id)
            ? s.lightingIds.filter((l) => l !== id)
            : [...s.lightingIds, id],
        })),
      toggleAccessory: (id) =>
        set((s) => ({
          accessoryIds: s.accessoryIds.includes(id)
            ? s.accessoryIds.filter((a) => a !== id)
            : [...s.accessoryIds, id],
        })),
      resetWorkspace: () =>
        set({
          deskId: null,
          chairId: null,
          monitorIds: [],
          monitorPositions: {},
          lightingIds: [],
          accessoryIds: [],
        }),
      applyPreset: (s) => set({ ...s }),
      surpriseMe: () =>
        set({
          deskId: pick(["electrical-adjustable-desk", "mechanical-adjustable-desk", "dual-motor-standar-desk"]),
          chairId: pick(["default-chair", "gaming-chair"]),
          monitorIds: pick([["24-full-hd"], ["32-lg-fine-art"], ["34-4k-gaming"], []]),
          lightingIds: [],
          accessoryIds: [],
        }),
    }),
    { name: "monis-workspace" }
  )
);

export function useMonthlyTotal() {
  const { deskId, chairId, monitorIds, lightingIds, accessoryIds } =
    useWorkspaceStore();
  return (
    priceOf(deskId) +
    priceOf(chairId) +
    monitorIds.reduce((a, id) => a + priceOf(id), 0) +
    lightingIds.reduce((a, id) => a + priceOf(id), 0) +
    accessoryIds.reduce((a, id) => a + priceOf(id), 0)
  );
}

export function useSelectedProducts() {
  const s = useWorkspaceStore();
  const ids = [
    s.deskId,
    s.chairId,
    ...s.monitorIds,
    ...s.lightingIds,
    ...s.accessoryIds,
  ].filter(Boolean) as string[];
  return ids
    .map((id) => productById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}
