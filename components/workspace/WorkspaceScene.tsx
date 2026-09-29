"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Armchair } from "lucide-react";
import { productById } from "@/data/products";
import { useWorkspaceStore } from "@/store/workspaceStore";
import DraggableLayer from "./DraggableLayer";

function BaliBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src="/assets/scene/background/bali-room.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 900px"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}

export default function WorkspaceScene({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { deskId, chairId, monitorIds, monitorPositions, setMonitorPos } =
    useWorkspaceStore();
  const desk = productById(deskId ?? "");
  const chair = productById(chairId ?? "");
  const monitors = monitorIds
    .map((id) => productById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const sceneRef = useRef<HTMLDivElement>(null);

  const chairSuffix =
    chair?.id === "gaming-chair" ? "gaming-chair" : "default-chair";
  const sceneSrc = desk?.workspaceScene
    ? desk.workspaceScene.replace("__default-chair", `__${chairSuffix}`)
    : null;
  const sceneKey = desk ? `${desk.id}__${chairSuffix}` : "empty";

  return (
    <div
      ref={sceneRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-[#DDDAD2] bg-[#F5F3EE] shadow-[0_8px_30px_rgba(37,37,37,0.06)] ${
        compact ? "aspect-[16/10]" : "aspect-[16/10] md:aspect-[21/10]"
      }`}
      role="img"
      aria-label={desk ? `Workspace with ${desk.name}` : "Workspace preview"}
    >
      <BaliBackdrop />

      <AnimatePresence initial={false}>
        {sceneSrc && (
          <motion.div
            key={sceneKey}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={sceneSrc}
              alt={
                desk
                  ? `${desk.name} with ${chair?.name ?? "default chair"}`
                  : "Workspace"
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {sceneSrc &&
          monitors.map((m) => {
            const pos = monitorPositions[m.id] ?? {
              x: m.scene.x,
              y: m.scene.y,
            };
            return (
              <DraggableLayer
                key={m.id}
                id={m.id}
                x={pos.x}
                y={pos.y}
                width={m.scene.width}
                constraintsRef={sceneRef}
                onCommit={setMonitorPos}
                label={`${m.name}: drag to reposition`}
              >
                <Image
                  src={m.sceneImage}
                  alt=""
                  width={m.sceneSize?.width ?? 600}
                  height={m.sceneSize?.height ?? 400}
                  className="h-auto w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                  draggable={false}
                />
              </DraggableLayer>
            );
          })}
      </AnimatePresence>

      {!desk && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-[#F5F3EE]/70 backdrop-blur-[1px]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow">
            <Armchair className="h-5 w-5 text-[#5F705B]" />
          </span>
          <p className="font-serif text-xl text-[#252525]">
            Your workspace is waiting.
          </p>
          <p className="text-sm text-[#6F6F68]">Start with a desk below.</p>
        </motion.div>
      )}

      <div className="absolute bottom-3 left-4 z-50 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
        Live preview, updates instantly
      </div>
      <div className="absolute right-4 top-3 z-50 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium text-[#252525] backdrop-blur">
        {desk ? desk.name : "Bali, Indonesia"}
      </div>
    </div>
  );
}
