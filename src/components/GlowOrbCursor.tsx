import { useEffect, useRef } from "react";
import "./glow-orb-cursor.css";

/**
 * GlowOrbCursor — DevSupAI
 * Curseur personnalisé : orbe flou violet/bleu qui grossit au survol
 * des éléments `.cursor-target` et pulse au clic.
 *
 * Utilisation :
 *   1. Placer <GlowOrbCursor /> une seule fois, tout en haut de l'app (ex: App.tsx)
 *   2. Ajouter className="cursor-target" sur les boutons, liens, cartes cliquables
 */
export default function GlowOrbCursor() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const body = document.body;
    body.classList.add("cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    const EASE = 0.18;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const el = document.elementFromPoint(mouseX, mouseY);
      const isTarget = !!(el && el.closest("a, button, input, select, textarea, [role='button'], .cursor-target"));
      body.classList.toggle("cursor-hover", isTarget);
    };

    const spawnPing = (x: number, y: number) => {
      const ping = document.createElement("div");
      ping.className = "cursor-ping";
      ping.style.left = `${x}px`;
      ping.style.top = `${y}px`;
      body.appendChild(ping);
      setTimeout(() => ping.remove(), 600);
    };

    const handleMouseDown = (e: MouseEvent) => {
      body.classList.add("cursor-click");
      spawnPing(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setTimeout(() => body.classList.remove("cursor-click"), 160);
    };

    const handleLeave = () => {
      if (orbRef.current) orbRef.current.style.opacity = "0";
    };
    const handleEnter = () => {
      if (orbRef.current) orbRef.current.style.opacity = "1";
    };

    const loop = () => {
      orbX += (mouseX - orbX) * EASE;
      orbY += (mouseY - orbY) * EASE;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${orbX}px, ${orbY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(rafId);
      body.classList.remove("cursor-active", "cursor-hover", "cursor-click");
    };
  }, []);

  return <div ref={orbRef} className="cursor-orb" />;
}
