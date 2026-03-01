import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="shell not-found">
      <h1>Page not found</h1>
      <p>The page you requested does not exist in this environment.</p>
      <Link href="/blog" className="button button--primary">
        Go to blog
      </Link>
    </main>
  );
}
