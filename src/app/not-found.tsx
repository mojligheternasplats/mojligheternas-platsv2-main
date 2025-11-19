export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8">
        We couldn't find what you were looking for.
      </p>

      <a
        href="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90"
      >
        Go back home
      </a>
    </div>
  );
}
