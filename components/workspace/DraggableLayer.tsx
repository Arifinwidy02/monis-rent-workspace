"use client";

import { motion } from "framer-motion";
import type { RefObject } from "react";
import type { LayerPosition } from "@/data/products";

const clamp100 = (v: number) => Math.min(100, Math.max(0, Math.round(v * 10) / 10));

/**
 * Reusable draggable scene layer. Outer node owns positioning + fade,
 * inner node owns the drag transform so the two never conflict.
 * Coordinates are normalized 0-100 and persist in the store.
 */
export default function DraggableLayer({
  id,
  x,
  y,
  width,
  constraintsRef,
  onCommit,
  label,
  children,
}: {
  id: string;
  x: number;
  y: number;
  width: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
  onCommit: (id: string, pos: LayerPosition) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%`, width: `${width}%`, zIndex: 10 }}
      aria-label={label}
    >
      <motion.div
        key={`${x}-${y}`}
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        initial={false}
        onDragEnd={(_, info) => {
          const rect = constraintsRef.current?.getBoundingClientRect();
          if (!rect || rect.width === 0 || rect.height === 0) return;
          onCommit(id, {
            x: clamp100(x + (info.offset.x / rect.width) * 100),
            y: clamp100(y + (info.offset.y / rect.height) * 100),
          });
        }}
        className="touch-none cursor-grab active:cursor-grabbing"
        title="Drag to move"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
