// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CinemaScroll } from './components/CinemaScroll/CinemaScroll';
import { ScamCheck } from './components/ScamCheck/ScamCheck';
import { QRDecoder } from './components/QRDecoder/QRDecoder';
import { SiteHeader } from './components/Nav/SiteHeader';
import { useTranslation } from 'react-i18next';

function ToolShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="tool-shell">
      <SiteHeader isToolPage={true} />
      <div className="tool-content">
        {children}
        <Link to="/" className="tool-back">{t('ui.backHome')}</Link>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CinemaScroll />} />
        <Route
          path="/check"
          element={
            <ToolShell>
              <ScamCheck />
            </ToolShell>
          }
        />
        <Route
          path="/qr"
          element={
            <ToolShell>
              <QRDecoder />
            </ToolShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
