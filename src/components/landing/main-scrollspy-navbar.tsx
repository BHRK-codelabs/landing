"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type SpyItem = {
  id: string;
  label: string;
};

type MainScrollSpyNavbarProps = {
  items: SpyItem[];
};

export function MainScrollSpyNavbar({ items }: MainScrollSpyNavbarProps) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    let frame = 0;

    const updateActive = () => {
      const viewportHeight = window.innerHeight;
      const marker = viewportHeight * 0.24;
      let bestId = items[0]?.id ?? "";
      let bestScore = -Infinity;

      for (const item of items) {
        const node = document.getElementById(item.id);
        if (!node) {
          continue;
        }

        const rect = node.getBoundingClientRect();
        const visiblePx =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const clampedVisiblePx = Math.max(0, visiblePx);
        const visibleRatio = clampedVisiblePx / Math.max(1, rect.height);
        const distance = Math.abs(rect.top - marker);
        const score = visibleRatio * 2.2 - distance / viewportHeight;

        if (score > bestScore) {
          bestScore = score;
          bestId = item.id;
        }
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    const onScrollOrResize = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 22);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="relative mx-auto w-full max-w-6xl  md:px-12 md:py-6">
      <div className="relative flex items-center justify-between  bg-[linear-gradient(120deg,rgba(0,212,255,0.08),rgba(124,58,237,0.08),rgba(255,255,255,0.03))] px-6 py-4 backdrop-blur-md md:hidden">
        <a className="group flex flex-1 items-center" href="#inicio">
          <Image
            alt="BHRK Codelabs"
            className="h-9 w-auto opacity-92 transition duration-300 group-hover:opacity-100"
            height={48}
            priority
            src="/brand/bhrk-logo-primary.png"
            width={198}
          />
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label="Abrir navegación"
          className="inline-flex items-center justify-center text-[var(--color-accent-lime)]"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          <span className="font-mono text-xl font-black leading-none tracking-[-0.02em]">
            {">."}
          </span>
        </button>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-1/2 hidden h-5 w-[min(74%,50rem)] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.14),rgba(124,58,237,0.1),rgba(255,255,255,0.06))] blur-xl md:block"
        animate={reducedMotion ? undefined : { opacity: [0.14, 0.26, 0.14] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 4.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
        }
      />

      <motion.div
        className={`relative hidden rounded-3xl px-3 py-2 md:flex md:items-center ${
          isScrolled
            ? "shadow-[0_12px_24px_rgba(6,14,30,0.16)] backdrop-blur-md"
            : "bg-transparent"
        }`}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.35, ease: "easeOut" }}
      >
        <a className="group flex min-w-[220px] shrink-0 items-center pl-4" href="#inicio">
          <Image
            alt="BHRK Codelabs"
            className="h-10 w-auto opacity-92 transition duration-300 group-hover:opacity-100"
            height={48}
            priority
            src="/brand/bhrk-logo-primary.png"
            width={198}
          />
        </a>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                className={`relative shrink-0 rounded-xl px-5 py-4 text-sm transition ${
                  active
                    ? "text-[var(--color-accent-cyan)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
                {active ? (
                  <motion.span
                    className="absolute -bottom-2 left-1/2 h-4 w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.36),rgba(124,58,237,0.22),transparent_72%)] blur-md"
                    layoutId="main-navbar-active-glow"
                    transition={
                      reducedMotion
                        ? { duration: 0.01 }
                        : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <div className="flex min-w-[220px] shrink-0 justify-end pl-10">
          <a
            className="rounded-xl px-5 py-4 text-sm font-medium tracking-[0.04em] text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
            href="#contacto"
          >
            Contacto directo
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[70] md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.28, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[rgba(6,10,22,0.58)] backdrop-blur-xl" />
            <motion.div
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="relative flex h-dvh w-full flex-col bg-[linear-gradient(135deg,rgba(0,212,255,0.14),rgba(124,58,237,0.12),rgba(13,13,15,0.9))]"
              initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
              transition={
                reducedMotion
                  ? { duration: 0.01 }
                  : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="mx-auto w-full max-w-6xl px-6 py-4">
                <div className="flex items-center justify-between">
                  <Image
                    alt="BHRK Codelabs"
                    className="h-9 w-auto opacity-95"
                    height={48}
                    priority
                    src="/brand/bhrk-logo-primary.png"
                    width={198}
                  />
                  <button
                    aria-label="Cerrar navegación"
                    className="inline-flex items-center justify-center text-[var(--color-accent-lime)]"
                    onClick={() => setMenuOpen(false)}
                    type="button"
                  >
                    <span className="font-mono text-xl font-black leading-none tracking-[-0.02em]">
                      {">."}
                    </span>
                  </button>
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-6xl flex-1 px-6 pb-12 pt-12">
                <div className="grid w-full gap-4">
                  {items.map((item) => {
                    const active = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        className={`rounded-lg px-4 py-3 text-[1.05rem] tracking-[0.02em] transition ${
                          active ? "text-[var(--color-accent-cyan)]" : "text-[var(--color-text-primary)]"
                        }`}
                        href={`#${item.id}`}
                        onClick={() => {
                          setActiveId(item.id);
                          setMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                  <a
                    className="mt-4 rounded-lg px-4 py-3 text-[1.05rem] text-[var(--color-text-primary)]"
                    href="#contacto"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contacto directo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
