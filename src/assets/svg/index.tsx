import type { SVGProps } from "react";

// Simple inline components so we don't need vite-plugin-svgr
// (If you install vite-plugin-svgr you can import .svg directly instead)

const mk = (paths: string) => (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    dangerouslySetInnerHTML={{ __html: paths }}
  />
);

export const shopIcons = {
  grocery: mk(`<path d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>`),
  hardware: mk(`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`),
  stationary: mk(`<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>`),
  sanitary: mk(`<path d="M4 20V8a4 4 0 0 1 8 0v12"/><path d="M4 12h8"/><path d="M14 6h6l-3 6h3l-4 8"/>`),
  electronics: mk(`<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>`),
  food: mk(`<path d="M3 11h18M5 11a7 7 0 0 1 14 0M12 3v4"/><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/>`),
  health: mk(`<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="9"/>`),
  services: mk(`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`),
  fashion: mk(`<path d="M6 2l6 3 6-3v6l-3 1v12H9V9L6 8V2z"/>`),
  automotive: mk(`<path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M3 13l2-6h14l2 6v4H3v-4z"/>`),
  home: mk(`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>`),
  education: mk(`<path d="M2 7l10-5 10 5-10 5L2 7z"/><path d="M6 10v6c0 2 3 3 6 3s6-1 6-3v-6"/>`),
  pets: mk(`<circle cx="5" cy="9" r="2"/><circle cx="19" cy="9" r="2"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><path d="M12 12c-3 0-5 2-5 4s2 3 5 3 5-1 5-3-2-4-5-4z"/>`),
  beauty: mk(`<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2 2"/>`),
  sports: mk(`<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6 6l12 12M6 18L18 6"/>`),
  travel: mk(`<path d="M2 12l20-8-8 20-2-8-10-4z"/>`),
  finance: mk(`<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>`),
  religious: mk(`<path d="M12 2v20M4 8h16M8 2l4 4 4-4"/>`),
  agriculture: mk(`<path d="M12 22V8M4 8h16M8 2v4M16 2v4M6 14l-2 4M18 14l2 4"/>`),
  industrial: mk(`<path d="M2 22V12l6 4V12l6 4V8h6v14H2z"/>`),
} as const;

export type ShopIconKey = keyof typeof shopIcons;