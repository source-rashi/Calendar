'use client';

import React from 'react';
import Image from 'next/image';
import { MONTHS, MONTHS_SHORT, getMonthImage } from '@/lib/calendarUtils';
import styles from './CalendarHero.module.css';

interface CalendarHeroProps {
  year: number;
  month: number; // 0-indexed
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  isFlipping: boolean;
}

export default function CalendarHero({
  year, month, onPrev, onNext, onToday, isFlipping
}: CalendarHeroProps) {
  const monthImg = getMonthImage(month + 1);
  const { palette } = monthImg;

  return (
    <div className={`${styles.hero} ${isFlipping ? styles.flipping : ''}`}>
      {/* Spiral binding */}
      <div className={styles.spiralContainer}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className={styles.spiralCoil} />
        ))}
      </div>

      {/* Hero image */}
      <div className={styles.imageWrapper}>
        <Image
          src={monthImg.url}
          alt={`${MONTHS[month]} ${year} - ${monthImg.location}`}
          fill
          className={styles.heroImage}
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className={styles.imageOverlay} />

        {/* Photographer credit */}
        <div className={styles.photoCredit}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          {monthImg.photographer} · {monthImg.location}
        </div>
      </div>

      {/* Wave divider with month/year */}
      <div className={styles.waveSection} style={{ '--wave-color': palette.primary } as any}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 900 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M0,80 L0,40 Q100,0 200,25 Q300,50 400,20 Q500,0 600,25 Q700,50 800,20 Q850,10 900,30 L900,80 Z`}
            fill={palette.primary}
          />
        </svg>

        <div className={styles.monthYearBadge} style={{ background: palette.primary }}>
          <span className={styles.yearText}>{year}</span>
          <span className={styles.monthText}>{MONTHS[month].toUpperCase()}</span>
        </div>

        {/* Navigation arrows */}
        <div className={styles.navButtons}>
          <button
            className={styles.navBtn}
            onClick={onPrev}
            aria-label="Previous month"
            style={{ '--nav-color': palette.accent || '#fff' } as any}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className={styles.todayBtn}
            onClick={onToday}
            aria-label="Go to today"
          >
            Today
          </button>
          <button
            className={styles.navBtn}
            onClick={onNext}
            aria-label="Next month"
            style={{ '--nav-color': palette.accent || '#fff' } as any}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
