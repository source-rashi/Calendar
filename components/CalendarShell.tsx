'use client';

import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { getMonthImage } from '@/lib/calendarUtils';
import CalendarHero from './CalendarHero';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import styles from './CalendarShell.module.css';

export default function CalendarShell() {
  const calendar = useCalendar();
  const currentMonthImage = getMonthImage(calendar.currentMonth + 1);
  const primaryColor = currentMonthImage.palette.primary;

  return (
    <div className={`${styles.calendarShell} ${calendar.isFlipping ? styles.flipping : ''}`}>
      {/* Top Hero Section */}
      <CalendarHero
        year={calendar.currentYear}
        month={calendar.currentMonth}
        onPrev={calendar.goToPrevMonth}
        onNext={calendar.goToNextMonth}
        onToday={calendar.goToToday}
      />

      {/* Main Body (Grid + Notes) */}
      <div className={styles.calendarBody}>
        {/* Left Side: Notes Panel */}
        <div className={styles.sidebar}>
          <NotesPanel
            currentYear={calendar.currentYear}
            currentMonth={calendar.currentMonth}
            dateRange={calendar.dateRange}
            dateNotes={calendar.dateNotes}
            monthNotes={calendar.monthNotes}
            addDateNote={calendar.addDateNote}
            deleteDateNote={calendar.deleteDateNote}
            saveMonthNote={calendar.saveMonthNote}
            primaryColor={primaryColor}
          />
        </div>

        {/* Right Side: Grid */}
        <div className={styles.mainContent}>
          <CalendarGrid
            year={calendar.currentYear}
            month={calendar.currentMonth}
            today={calendar.today}
            dateRange={calendar.dateRange}
            hoverDate={calendar.hoverDate}
            isSelectingEnd={calendar.isSelectingEnd}
            onDateClick={calendar.handleDateClick}
            onDateHover={calendar.setHoverDate}
            dateNotes={calendar.dateNotes}
            monthPrimary={primaryColor}
          />
        </div>
      </div>
    </div>
  );
}
