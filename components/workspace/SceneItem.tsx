"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product, SceneTransform } from "@/data/products";
import { SceneLayer } from "./scene-art";

export function SceneItem({
  product,
  transform,
}: {
  product: Product;
  transform: SceneTransform;
}) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="absolute"
      style={{
        left: `${transform.x}%`,
        top: `${transform.y}%`,
        width: `${transform.width}%`,
        zIndex: transform.zIndex,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={product.name}
    >
      <SceneLayer id={product.id} category={product.category} />
    </motion.div>
  );
}

export function AnimatedLayer({
  id,
  children,
  transform,
}: {
  id: string;
  children: React.ReactNode;
  transform: SceneTransform;
}) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="absolute"
        style={{
          left: `${transform.x}%`,
          top: `${transform.y}%`,
          width: `${transform.width}%`,
          zIndex: transform.zIndex,
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
