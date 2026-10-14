export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/greenmatrix logo.jpg"
      alt="Greenmatrix Industry Pvt. Ltd. Logo"
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
