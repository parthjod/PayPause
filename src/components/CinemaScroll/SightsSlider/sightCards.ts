// src/components/CinemaScroll/SightsSlider/sightCards.ts
import type { ComponentType } from 'react';
import {
  IconShieldCheck,
  IconQRGrid,
  IconPhoneLock,
  IconDualBubble,
  IconLightbulb,
} from './icons';

export interface SightCardData {
  ariaLabel: string;
  kicker: string;
  heading: string;
  body: string;
  Icon: ComponentType;
}

export const SIGHT_CARDS: SightCardData[] = [
  {
    ariaLabel: 'Open Scam Check card',
    kicker: 'Instant Verdict',
    heading: 'Scam Check',
    body: 'Paste a suspicious message and know in seconds if it is trying to trick you.',
    Icon: IconShieldCheck,
  },
  {
    ariaLabel: 'Open QR Decoder card',
    kicker: 'Before You Scan',
    heading: 'QR Decoder',
    body: 'See whether a QR code sends money out or brings money in, before you tap.',
    Icon: IconQRGrid,
  },
  {
    ariaLabel: 'Open On-Device card',
    kicker: 'Your Data Stays Here',
    heading: 'On-Device',
    body: 'Nothing you paste ever leaves your phone. The check runs locally, not on a server.',
    Icon: IconPhoneLock,
  },
  {
    ariaLabel: 'Open Hindi-English card',
    kicker: 'Code-Mixed Text',
    heading: 'Hindi-English',
    body: 'Reads scam messages written in mixed Hindi and English, the way they actually arrive.',
    Icon: IconDualBubble,
  },
  {
    ariaLabel: 'Open Learn card',
    kicker: 'Why, Not Just What',
    heading: 'Learn As You Go',
    body: 'Every verdict explains the scam pattern behind it, so you recognize it next time.',
    Icon: IconLightbulb,
  },
];
