'use client';

import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { getMonthImage } from '@/lib/calendarUtils';
import CalendarHero from './CalendarHero';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import DateRangeInfo from './DateRangeInfo';
import styles from './CalendarShell.module.css';

export default function CalendarShell() {
  const calendar = useCalendar();
  const currentMonthImage = getMonthImage(calendar.currentMonth + 1);
  const primaryColor = currentMonthImage.palette.primary;

  return (
    <div className={styles.calendarShell}>
      {/* Top Hero Section */}
      <CalendarHero
        year={calendar.currentYear}
        month={calendar.currentMonth}
        onPrev={calendar.goToPrevMonth}
        onNext={calendar.goToNextMonth}
        onToday={calendar.goToToday}
        isFlipping={calendar.isFlipping}
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
            monthNotes={[]} // Not using monthNotes state here to avoid rerender issues since NotesPanel has local state
            addDateNote={calendar.addDateNote}
            deleteDateNote={calendar.deleteDateNote}
            saveMonthNote={calendar.saveMonthNote}
            primaryColor={primaryColor}
          />
        </div>

        {/* Right Side: Grid */}
        <div className={styles.mainContent}>
          {calendar.dateRange.start && (
            <DateRangeInfo 
              dateRange={calendar.dateRange} 
              clearSelection={calendar.clearSelection} 
              primaryColor={primaryColor}
            />
          )}
          
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
