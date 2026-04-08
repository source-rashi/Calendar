'use client';

import { useState, useCallback, useEffect } from 'react';
import { DateNote, MonthNote, DateRange } from '@/types/calendar';
import { formatDate, getMonthKey } from '@/lib/calendarUtils';

const NOTES_KEY = 'wall-calendar-notes';
const MONTH_NOTES_KEY = 'wall-calendar-month-notes';

export function useCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [dateNotes, setDateNotes] = useState<DateNote[]>([]);
  const [monthNotes, setMonthNotes] = useState<MonthNote[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  // Load persisted notes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      if (stored) setDateNotes(JSON.parse(stored));
      const storedMonth = localStorage.getItem(MONTH_NOTES_KEY);
      if (storedMonth) setMonthNotes(JSON.parse(storedMonth));
    } catch {
      // ignore
    }
  }, []);

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(dateNotes));
    } catch { /* ignore */ }
  }, [dateNotes]);

  useEffect(() => {
    try {
      localStorage.setItem(MONTH_NOTES_KEY, JSON.stringify(monthNotes));
    } catch { /* ignore */ }
  }, [monthNotes]);

  const goToPrevMonth = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => {
        if (prev === 0) { setCurrentYear(y => y - 1); return 11; }
        return prev - 1;
      });
      setIsFlipping(false);
    }, 400);
  }, []);

  const goToNextMonth = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => {
        if (prev === 11) { setCurrentYear(y => y + 1); return 0; }
        return prev + 1;
      });
      setIsFlipping(false);
    }, 400);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    if (!isSelectingEnd || !dateRange.start) {
      setDateRange({ start: date, end: null });
      setIsSelectingEnd(true);
    } else {
      const start = dateRange.start;
      if (date < start) {
        setDateRange({ start: date, end: start });
      } else if (isSameDay(date, start)) {
        setDateRange({ start: date, end: null });
        setIsSelectingEnd(false);
      } else {
        setDateRange({ start, end: date });
      }
      setIsSelectingEnd(false);
    }
  }, [isSelectingEnd, dateRange.start]);

  const clearSelection = useCallback(() => {
    setDateRange({ start: null, end: null });
    setIsSelectingEnd(false);
    setHoverDate(null);
  }, []);

  // Date notes CRUD
  const addDateNote = useCallback((date: Date, text: string, color: string) => {
    const note: DateNote = {
      id: crypto.randomUUID(),
      date: formatDate(date),
      text: text.trim(),
      color,
      createdAt: new Date().toISOString(),
    };
    setDateNotes(prev => [...prev, note]);
  }, []);

  const updateDateNote = useCallback((id: string, text: string) => {
    setDateNotes(prev => prev.map(n => n.id === id ? { ...n, text } : n));
  }, []);

  const deleteDateNote = useCallback((id: string) => {
    setDateNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  const getNotesForDate = useCallback((date: Date): DateNote[] => {
    const key = formatDate(date);
    return dateNotes.filter(n => n.date === key);
  }, [dateNotes]);

  // Month notes CRUD
  const getMonthNote = useCallback((year: number, month: number): MonthNote | undefined => {
    const key = getMonthKey(year, month);
    return monthNotes.find(n => n.month === key);
  }, [monthNotes]);

  const saveMonthNote = useCallback((year: number, month: number, text: string) => {
    const key = getMonthKey(year, month);
    setMonthNotes(prev => {
      const existing = prev.find(n => n.month === key);
      if (existing) {
        return prev.map(n => n.month === key ? { ...n, text } : n);
      }
      return [...prev, { id: crypto.randomUUID(), month: key, text, createdAt: new Date().toISOString() }];
    });
  }, []);

  return {
    today,
    currentYear,
    currentMonth,
    dateRange,
    isSelectingEnd,
    hoverDate,
    setHoverDate,
    isFlipping,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    clearSelection,
    addDateNote,
    updateDateNote,
    deleteDateNote,
    getNotesForDate,
    getMonthNote,
    saveMonthNote,
    dateNotes,
  };
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
