export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo_updated.jpeg"
      alt="Greenmatrix Industry Pvt. Ltd. Logo"
      className={`block h-full w-full object-contain ${className}`}
    />
  );
}
