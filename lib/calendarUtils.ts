import { Holiday, MonthImage } from '@/types/calendar';

export const DAYS_SHORT = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
export const MONTHS_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  // Returns 0=Mon ... 6=Sun (ISO week)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDate(str: string): Date {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const s = start < end ? start : end;
  const e = start < end ? end : start;
  return date >= s && date <= e;
}

export function isWeekend(dayIndex: number): boolean {
  // dayIndex from Monday=0; Sat=5, Sun=6
  return dayIndex === 5 || dayIndex === 6;
}

export function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

/* ── Holidays (US public holidays) ─────────────────────────────── */
export const HOLIDAYS: Holiday[] = [
  { date: '2026-01-01', name: "New Year's Day", type: 'national' },
  { date: '2026-01-19', name: 'MLK Day', type: 'national' },
  { date: '2026-02-14', name: "Valentine's Day", type: 'observance' },
  { date: '2026-02-16', name: "Presidents' Day", type: 'national' },
  { date: '2026-03-17', name: "St. Patrick's Day", type: 'observance' },
  { date: '2026-04-03', name: 'Good Friday', type: 'observance' },
  { date: '2026-04-05', name: 'Easter Sunday', type: 'observance' },
  { date: '2026-05-10', name: "Mother's Day", type: 'observance' },
  { date: '2026-05-25', name: 'Memorial Day', type: 'national' },
  { date: '2026-06-19', name: 'Juneteenth', type: 'national' },
  { date: '2026-06-21', name: "Father's Day", type: 'observance' },
  { date: '2026-07-04', name: 'Independence Day', type: 'national' },
  { date: '2026-09-07', name: 'Labor Day', type: 'national' },
  { date: '2026-10-12', name: 'Columbus Day', type: 'national' },
  { date: '2026-10-31', name: 'Halloween', type: 'observance' },
  { date: '2026-11-11', name: "Veterans' Day", type: 'national' },
  { date: '2026-11-26', name: 'Thanksgiving', type: 'national' },
  { date: '2026-12-25', name: 'Christmas Day', type: 'national' },
  { date: '2026-12-31', name: "New Year's Eve", type: 'observance' },
];

export function getHoliday(dateStr: string): Holiday | undefined {
  return HOLIDAYS.find(h => h.date === dateStr);
}

/* ── Month images (Unsplash curated) ───────────────────────────── */
export const MONTH_IMAGES: MonthImage[] = [
  { month: 1,  url: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=900&q=80', photographer: 'Oleksandr Pidvalnyi', location: 'Snowy Mountains', palette: { primary: '#1a6fc4', secondary: '#4a9ede', accent: '#00c9ff' } },
  { month: 2,  url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=80', photographer: 'Jack Anstey', location: 'Winter Forest', palette: { primary: '#4c6fa5', secondary: '#7a9fd4', accent: '#b8d4f0' } },
  { month: 3,  url: 'https://images.unsplash.com/photo-1490750967868-88df5691166d?w=900&q=80', photographer: 'Aaron Burden', location: 'Spring Bloom', palette: { primary: '#e07aa1', secondary: '#f5a3c1', accent: '#ffd6e8' } },
  { month: 4,  url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80', photographer: 'Dawid Zawiła', location: 'Cherry Blossoms', palette: { primary: '#c45178', secondary: '#e87da0', accent: '#ffc0d6' } },
  { month: 5,  url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=80', photographer: 'Ales Krivec', location: 'Green Fields', palette: { primary: '#2e7d32', secondary: '#4caf50', accent: '#a5d6a7' } },
  { month: 6,  url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80', photographer: 'Sean Oulashin', location: 'Summer Beach', palette: { primary: '#0277bd', secondary: '#039be5', accent: '#81d4fa' } },
  { month: 7,  url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80', photographer: 'Luca Bravo', location: 'Mountain Lake', palette: { primary: '#1565c0', secondary: '#1976d2', accent: '#90caf9' } },
  { month: 8,  url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80', photographer: 'Chris Lawton', location: 'Golden Fields', palette: { primary: '#e65100', secondary: '#ef6c00', accent: '#ffcc80' } },
  { month: 9,  url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80', photographer: 'Jamie Street', location: 'Autumn Forest', palette: { primary: '#bf360c', secondary: '#e64a19', accent: '#ffab91' } },
  { month: 10, url: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=900&q=80', photographer: 'James Wheeler', location: 'Fall Foliage', palette: { primary: '#6a1f10', secondary: '#c0392b', accent: '#e8a090' } },
  { month: 11, url: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=900&q=80', photographer: 'Braden Collum', location: 'Misty Forest', palette: { primary: '#4e342e', secondary: '#795548', accent: '#d7ccc8' } },
  { month: 12, url: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=900&q=80', photographer: 'Aaron Burden', location: 'Winter Snow', palette: { primary: '#1a237e', secondary: '#283593', accent: '#9fa8da' } },
];

export function getMonthImage(month: number): MonthImage {
  return MONTH_IMAGES.find(img => img.month === month) || MONTH_IMAGES[0];
}

export const NOTE_COLORS = [
  '#1a6fc4', '#e74c3c', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
];
