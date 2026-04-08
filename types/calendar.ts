export interface DateNote {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  text: string;
  color: string;
  createdAt: string;
}

export interface MonthNote {
  id: string;
  month: string; // YYYY-MM
  text: string;
  createdAt: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: 'national' | 'regional' | 'observance';
}

export type SelectionMode = 'single' | 'range';

export interface MonthImage {
  month: number; // 1-12
  url: string;
  photographer: string;
  location: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
  };
}
