import { SITE_NAME } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>{SITE_NAME} · Family-first conservation stories</p>
        <p>Accessible, SSR-first TypeScript implementation</p>
      </div>
    </footer>
  );
}
