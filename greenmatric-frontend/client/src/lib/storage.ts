// Product photos are static and bundled in /public (products/<slug>/main.jpg),
// so they ship with the build and never depend on a backend being up.
// `path` already starts with "products/…", so just serve it from the site root.
export function storageUrl(path: string): string {
  if (path.startsWith("/")) return path;
  return `/${path}`;
}
