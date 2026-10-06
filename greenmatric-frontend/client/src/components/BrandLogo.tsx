// Bundled brand mark (blue water-drop + green leaves) — no external dependency.
// ponytail: stopgap SVG matching the Greenmatrix logo; swap for the official
// transparent PNG in /public when the client provides it (FB-6).
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      {/* leaves */}
      <path d="M24 34c-7 0-12-4-13-11 7-1 12 2 13 9 1-7 6-10 13-9-1 7-6 11-13 11Z" fill="#2ecc57" />
      {/* water drop */}
      <path d="M24 8c4 6 7 10 7 14a7 7 0 0 1-14 0c0-4 3-8 7-14Z" fill="#2f9bff" />
    </svg>
  );
}
