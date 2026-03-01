'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="site-brand" aria-label="Toronto Zoo Report homepage">
          <Image
            src="/media/logo-word.png"
            alt="Toronto Zoo Report"
            width={176}
            height={54}
            className="site-brand__logo"
            priority
          />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav id="site-nav" className={`site-nav ${isOpen ? 'site-nav--open' : ''}`}>
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
