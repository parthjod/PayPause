// src/components/Nav/SiteHeader.tsx
import { LanguageSwitcher } from './LanguageSwitcher';

interface SiteHeaderProps {
  isToolPage?: boolean;
}

export function SiteHeader({ isToolPage = false }: SiteHeaderProps) {
  function handleCheckNav(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isToolPage) {
      e.preventDefault();
      const checkToolEl = document.getElementById('check-tool');
      if (checkToolEl) {
        window.scrollTo({ top: 3900, behavior: 'smooth' });
      }
    }
  }

  function handleSectionNav(e: React.MouseEvent<HTMLAnchorElement>, topPos: number) {
    if (!isToolPage) {
      e.preventDefault();
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  }

  const h = (hash: string) => (isToolPage ? `/${hash}` : hash);

  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="site-logo" href={h('/')} onClick={(e) => handleSectionNav(e, 0)}>
        PayPause
      </a>

      <nav className="site-nav" aria-label="Main menu" style={{ marginRight: "70px" }}>
        <a href={isToolPage ? '/check' : '#check-tool'} onClick={handleCheckNav}>Check</a>
        <a href={h('#Features')} onClick={(e) => handleSectionNav(e, 1900)}>Features</a>
      </nav>

      <LanguageSwitcher />
    </header>
  );
}
