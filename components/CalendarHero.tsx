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
}

export default function CalendarHero({
  year, month, onPrev, onNext, onToday
}: CalendarHeroProps) {
  const monthImg = getMonthImage(month + 1);
  const { palette } = monthImg;

  return (
    <div className={styles.hero}>
      {/* Center Hanger Loop */}
      <div className={styles.calendarHanger}>
        <div className={styles.hangerLoop} />
      </div>

      {/* Spiral binding */}
      <div className={styles.spiralContainer}>
        {/* Continuous straight wire */}
        <div className={styles.spiralWire} />
        {Array.from({ length: 28 }).map((_, i) => (
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

      {/* Angular geometry overlay */}
      <div className={styles.angularOverlay}>
        <svg
          className={styles.angularSvg}
          viewBox="0 0 1000 150"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left smaller triangle */}
          <polygon points="0,150 0,80 300,150" fill={palette.primary} />
          {/* Right larger polygon with text */}
          <polygon points="300,150 1000,0 1000,150" fill={palette.primary} />
        </svg>

        <div className={styles.monthYearBadge}>
          <div className={styles.yearText}>{year}</div>
          <div className={styles.monthText}>{MONTHS[month].toUpperCase()}</div>
        </div>

        {/* Navigation arrows (floating over the image/shapes) */}
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
