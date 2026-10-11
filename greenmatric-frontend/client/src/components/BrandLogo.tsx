export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo_1.svg"
      alt="Greenmatrix Logo"
      className={`object-contain ${className}`}
    />
  );
}
