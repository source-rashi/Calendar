'use client';

import React, { useMemo } from 'react';
import {
  DAYS_SHORT,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDate,
  isSameDay,
  isInRange,
  isWeekend,
  getHoliday,
} from '@/lib/calendarUtils';
import { DateRange, DateNote } from '@/types/calendar';
import styles from './CalendarGrid.module.css';

interface CalendarGridProps {
  year: number;
  month: number;
  today: Date;
  dateRange: DateRange;
  hoverDate: Date | null;
  isSelectingEnd: boolean;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  dateNotes: DateNote[];
  monthPrimary: string;
}

interface DayCell {
  date: Date;
  dayNum: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverRange: boolean;
  isWeekend: boolean;
  holiday: ReturnType<typeof getHoliday>;
  hasNote: boolean;
  colIndex: number;
}

export default function CalendarGrid({
  year, month, today, dateRange, hoverDate, isSelectingEnd,
  onDateClick, onDateHover, dateNotes, monthPrimary
}: CalendarGridProps) {

  const cells: DayCell[] = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const result: DayCell[] = [];

    // Previous month overflow
    for (let i = 0; i < firstDay; i++) {
      const d = prevMonthDays - firstDay + 1 + i;
      const date = new Date(year, month - 1, d);
      result.push(makeCell(date, false, today, dateRange, hoverDate, isSelectingEnd, dateNotes, i));
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const colIndex = (firstDay + d - 1) % 7;
      result.push(makeCell(date, true, today, dateRange, hoverDate, isSelectingEnd, dateNotes, colIndex));
    }

    // Next month overflow
    const totalCells = Math.ceil(result.length / 7) * 7;
    let nextDay = 1;
    while (result.length < totalCells) {
      const date = new Date(year, month + 1, nextDay++);
      const colIndex = result.length % 7;
      result.push(makeCell(date, false, today, dateRange, hoverDate, isSelectingEnd, dateNotes, colIndex));
    }

    return result;
  }, [year, month, today, dateRange, hoverDate, isSelectingEnd, dateNotes]);

  return (
    <div className={styles.gridWrapper}>
      {/* Day headers */}
      <div className={styles.dayHeaders}>
        {DAYS_SHORT.map((day, i) => (
          <div
            key={day}
            className={`${styles.dayHeader} ${i >= 5 ? styles.weekendHeader : ''}`}
            style={i >= 5 ? { color: monthPrimary } : undefined}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.grid}>
        {cells.map((cell, idx) => {
          const key = formatDate(cell.date);
          return (
            <DayCell
              key={key + idx}
              cell={cell}
              monthPrimary={monthPrimary}
              onDateClick={onDateClick}
              onDateHover={onDateHover}
            />
          );
        })}
      </div>
    </div>
  );
}

function DayCell({ cell, monthPrimary, onDateClick, onDateHover }: {
  cell: DayCell;
  monthPrimary: string;
  onDateClick: (d: Date) => void;
  onDateHover: (d: Date | null) => void;
}) {
  const {
    date, dayNum, isCurrentMonth, isToday, isStart, isEnd,
    isInRange: inRange, isHoverRange, isWeekend: weekend,
    holiday, hasNote, colIndex
  } = cell;

  const isSelected = isStart || isEnd;
  const isRangeActive = inRange || isHoverRange;

  const getBgStyle = () => {
    if (isSelected) return { background: monthPrimary, color: '#fff' };
    if (isRangeActive) return { background: `${monthPrimary}1a` };
    return {};
  };

  const getTextColor = () => {
    if (isSelected) return '#fff';
    if (!isCurrentMonth) return '#c0c8d8';
    if (weekend) return monthPrimary;
    return '#2e3a5a';
  };

  return (
    <button
      className={`
        ${styles.dayCell}
        ${isCurrentMonth ? styles.currentMonth : styles.otherMonth}
        ${isSelected ? styles.selected : ''}
        ${isStart ? styles.rangeStart : ''}
        ${isEnd ? styles.rangeEnd : ''}
        ${isRangeActive && !isSelected ? styles.inRange : ''}
        ${isToday && !isSelected ? styles.today : ''}
        ${holiday ? styles.holiday : ''}
      `.trim()}
      style={{
        ...getBgStyle(),
        '--day-color': monthPrimary,
      } as React.CSSProperties}
      onClick={() => onDateClick(date)}
      onMouseEnter={() => onDateHover(date)}
      onMouseLeave={() => onDateHover(null)}
      aria-label={`${date.toDateString()}${holiday ? ` - ${holiday.name}` : ''}`}
      aria-pressed={isSelected}
    >
      <span className={styles.dayNum} style={{ color: getTextColor() }}>
        {dayNum}
      </span>

      {/* Today indicator */}
      {isToday && !isSelected && (
        <span className={styles.todayDot} style={{ background: monthPrimary }} />
      )}

      {/* Holiday indicator */}
      {holiday && (
        <span className={styles.holidayIndicator} title={holiday.name}>
          <span
            className={styles.holidayDot}
            style={{ background: holiday.type === 'national' ? '#e74c3c' : '#f39c12' }}
          />
        </span>
      )}

      {/* Note indicator */}
      {hasNote && !isSelected && (
        <span className={styles.noteDot} />
      )}

      {/* Range edge rounding helpers */}
      {isStart && !cell.isEnd && (
        <span className={styles.rangeCapLeft} style={{ background: `${monthPrimary}1a` }} />
      )}
      {isEnd && !cell.isStart && (
        <span className={styles.rangeCapRight} style={{ background: `${monthPrimary}1a` }} />
      )}
    </button>
  );
}

/* ── Helper ────────────────────────────────────────────────────── */
function makeCell(
  date: Date,
  isCurrentMonth: boolean,
  today: Date,
  dateRange: DateRange,
  hoverDate: Date | null,
  isSelectingEnd: boolean,
  dateNotes: DateNote[],
  colIndex: number
): DayCell {
  const { start, end } = dateRange;
  const isStart = !!start && isSameDay(date, start);
  const isEnd = !!end && isSameDay(date, end);

  // Hover range while selecting
  let isHoverRange = false;
  if (isSelectingEnd && start && hoverDate) {
    const rangeEnd = hoverDate > start ? hoverDate : start;
    const rangeStart = hoverDate > start ? start : hoverDate;
    isHoverRange = date >= rangeStart && date <= rangeEnd;
  }

  const dateKey = formatDate(date);
  const hasNote = dateNotes.some(n => n.date === dateKey);

  return {
    date,
    dayNum: date.getDate(),
    isCurrentMonth,
    isToday: isSameDay(date, today),
    isStart,
    isEnd,
    isInRange: isInRange(date, start, end),
    isHoverRange,
    isWeekend: isWeekend(colIndex),
    holiday: getHoliday(formatDate(date)),
    hasNote,
    colIndex,
  };
}
