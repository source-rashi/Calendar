'use client';

import React from 'react';
import { DateRange } from '@/types/calendar';
import styles from './DateRangeInfo.module.css';

interface DateRangeInfoProps {
  dateRange: DateRange;
  clearSelection: () => void;
  primaryColor: string;
}

export default function DateRangeInfo({ dateRange, clearSelection, primaryColor }: DateRangeInfoProps) {
  if (!dateRange.start) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysCount = () => {
    if (!dateRange.start || !dateRange.end) return 1;
    const diffTime = Math.abs(dateRange.end.getTime() - dateRange.start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className={styles.rangeInfoContainer} style={{ borderLeftColor: primaryColor }}>
      <div className={styles.rangeDetails}>
        <div className={styles.dateLabel}>
          <span className={styles.icon} style={{ color: primaryColor }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
          <span className={styles.dateText}>
            {formatDate(dateRange.start)}
            {dateRange.end && dateRange.end.getTime() !== dateRange.start.getTime() && (
              <> <span className={styles.arrow}>→</span> {formatDate(dateRange.end)}</>
            )}
          </span>
        </div>
        {dateRange.end && (
          <div className={styles.daysCount}>
            {getDaysCount()} {getDaysCount() === 1 ? 'day' : 'days'}
          </div>
        )}
      </div>
      
      <button 
        className={styles.clearBtn} 
        onClick={clearSelection}
        aria-label="Clear selection"
      >
        Clear
      </button>
    </div>
  );
}
