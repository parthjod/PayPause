// src/components/CinemaScroll/CinemaScroll.tsx
import { useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { SiteHeader } from '../Nav/SiteHeader';
import { IntroCopy } from './IntroCopy';
import { StoryPanel } from './StoryPanel';
import { ScamCheck } from '../ScamCheck/ScamCheck';
import { useTranslation } from 'react-i18next';
import '../../styles/CinemaScroll.css';

const ASSETS = {
  sky:         '/images/sky.png',
  backGlow:    '/images/backGlow.png',
  cityMidBack: '/images/cityMidBack.png',
  splitLeft:   '/images/splitLeft.png',
  splitRight:  '/images/splitRight.png',
  archFg:      '/images/archFg.png',
  frameTwo:    '/images/frameTwo.png',
};

export function CinemaScroll() {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useScrollProgress(stageRef, controlsRef);
  useMouseParallax();

  const bridgeFacts = [
    { dt: t('panels.bridge.stat1dt'), dd: t('panels.bridge.stat1dd') },
    { dt: t('panels.bridge.stat2dt'), dd: t('panels.bridge.stat2dd') },
  ];

  return (
    <main className="site-shell">
      <section
        className="cinema-scroll"
        id="cinema"
        ref={stageRef}
        aria-label="PayPause cinematic scroll story"
      >
        <div className="stage">
          <div className="world">
            {/* Sky — farthest background */}
            <img className="scene-img sky-img" src={ASSETS.sky} alt="" />

            {/* Navigation */}
            <SiteHeader isToolPage={false} />

            {/* Back stack — mid layers */}
            <div className="back-stack">
              <img className="scene-img back-img back-four" src={ASSETS.backGlow} alt="" />
              <img className="scene-img back-img back-bazaar" src={ASSETS.cityMidBack} alt="" />
            </div>

            {/* Hero title — sized and positioned to fit inside the arch opening */}
            <h1 className="hero-title">PAYPAUSE</h1>

            {/* Splitframes */}
            <img className="scene-img splitframe-img splitframe-left"  src={ASSETS.splitLeft}  alt="" />
            <img className="scene-img splitframe-img splitframe-right" src={ASSETS.splitRight} alt="" />

            {/* Arch foreground */}
            <img className="scene-img bridge-img" src={ASSETS.archFg} alt="" />

            {/* Frame two close-up */}
            <img className="scene-img frame-two-img" src={ASSETS.frameTwo} alt="" />

            {/* Navy shade overlay */}
            <div className="shade" />
          </div>

          {/* Intro copy — below world, inside stage */}
          <IntroCopy />

          {/* Scam check story panel */}
          <StoryPanel
            id="bridge-panel"
            className="story-panel-bridge"
            ariaLabel="Scam check details"
            headingKey="panels.bridge.heading"
            bodyKey="panels.bridge.body"
            facts={bridgeFacts}
          />

          {/* Privacy story panel */}
          <StoryPanel
            id="safety"
            className="story-panel-bazaar"
            ariaLabel="Privacy details"
            headingKey="panels.bazaar.heading"
            bodyKey="panels.bazaar.body"
            noteButton
          />

          {/* Embedded Scam Check tool on the final scroll page */}
          <section
            className="home-check-container"
            id="check-tool"
            aria-label="PayPause instant scam check tool"
          >
            <ScamCheck />
          </section>
        </div>
      </section>
    </main>
  );
}
