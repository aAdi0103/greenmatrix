import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 text-center">
      <Container>
        <div className="text-sm font-semibold uppercase tracking-wider text-brand">404</div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/products" variant="outline">Browse Products</Button>
        </div>
      </Container>
    </div>
  );
}
