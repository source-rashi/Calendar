'use client';

import React, { useState, useEffect } from 'react';
import { DateNote, MonthNote, DateRange } from '@/types/calendar';
import { NOTE_COLORS, formatDate, MONTHS, getMonthKey } from '@/lib/calendarUtils';
import styles from './NotesPanel.module.css';

interface NotesPanelProps {
  currentYear: number;
  currentMonth: number;
  dateRange: DateRange;
  dateNotes: DateNote[];
  monthNotes: MonthNote[];
  addDateNote: (date: Date, text: string, color: string) => void;
  deleteDateNote: (id: string) => void;
  saveMonthNote: (year: number, month: number, text: string) => void;
  primaryColor: string;
}

export default function NotesPanel({
  currentYear,
  currentMonth,
  dateRange,
  dateNotes,
  monthNotes,
  addDateNote,
  deleteDateNote,
  saveMonthNote,
  primaryColor
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<'month' | 'date'>('month');
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const monthKey = getMonthKey(currentYear, currentMonth);
  const currentMonthNote = monthNotes.find(n => n.month === monthKey)?.text || '';

  // Switch to date tab when a date range is selected
  useEffect(() => {
    if (dateRange.start) {
      setActiveTab('date');
    } else {
      setActiveTab('month');
    }
  }, [dateRange.start]);

  const handleMonthNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    saveMonthNote(currentYear, currentMonth, e.target.value);
  };

  const handleAddDateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !dateRange.start) return;
    addDateNote(dateRange.start, newNoteText, selectedColor);
    setNewNoteText('');
  };

  const renderDateRangeNotes = () => {
    if (!dateRange.start) {
      return (
        <div className={styles.emptyState}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <p>Please select a date or range to add notes.</p>
        </div>
      );
    }

    const startKey = formatDate(dateRange.start);
    // Simple filter: only showing notes matching the start date for this demo
    const notesForSelection = dateNotes.filter(n => n.date === startKey);

    return (
      <div className={styles.dateNotesContainer}>
        <div className={styles.notesList}>
          {notesForSelection.length === 0 ? (
            <p className={styles.noNotesMsg}>No notes for this date yet.</p>
          ) : (
            notesForSelection.map(note => (
              <div key={note.id} className={styles.noteItem} style={{ borderLeftColor: note.color }}>
                <p className={styles.noteText}>{note.text}</p>
                <button 
                  className={styles.deleteNoteBtn} 
                  onClick={() => deleteDateNote(note.id)}
                  aria-label="Delete note"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddDateNote} className={styles.addNoteForm}>
          <div className={styles.colorPicker}>
            {NOTE_COLORS.map(c => (
              <button
                key={c}
                type="button"
                className={`${styles.colorBtn} ${selectedColor === c ? styles.selectedColor : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setSelectedColor(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              placeholder="Add a new note..."
              className={styles.noteInput}
            />
            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={!newNoteText.trim()}
              style={{ color: primaryColor }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className={styles.notesPanel}>
      <div className={styles.header}>
        <h3 className={styles.notesTitle}>Notes</h3>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'month' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('month')}
            style={activeTab === 'month' ? { color: primaryColor } : {}}
          >
            Month
          </button>
          <span className={styles.tabDivider}>/</span>
          <button
            className={`${styles.tab} ${activeTab === 'date' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('date')}
            style={activeTab === 'date' ? { color: primaryColor } : {}}
          >
            Date
          </button>
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'month' ? (
          <div className={styles.monthNotesContainer}>
            <textarea
              className={styles.monthTextarea}
              placeholder="Write your memos here..."
              value={currentMonthNote}
              onChange={handleMonthNoteChange}
              spellCheck={false}
            />
            <div className={styles.notebookLines} />
          </div>
        ) : (
          renderDateRangeNotes()
        )}
      </div>
    </div>
  );
}
