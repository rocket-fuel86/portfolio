"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { OceanEngine } from "./engine";
import type { SharkTheme } from "./renderer";
import type { SharkSpec } from "./world";

/** Glyphs come from the canvas's font-family, so give it (or a parent) a monospace font. */
export function AsciiOcean({ className, sharks }: { className?: string; sharks?: SharkSpec[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<OceanEngine | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const initialTheme: SharkTheme = resolvedTheme === "light" ? "light" : "dark";
    const engine = new OceanEngine(canvas, sharks, initialTheme);
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // The roster is fixed for the life of the canvas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (engineRef.current && resolvedTheme) {
      engineRef.current.setTheme(resolvedTheme === "light" ? "light" : "dark");
    }
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`ascii-ocean ${className ?? ""}`} />;
}

export default AsciiOcean;
