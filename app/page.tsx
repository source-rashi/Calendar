'use client';

import { useEffect, useState } from "react";
import CalendarShell from "@/components/CalendarShell";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Bypass SSR for the calendar to prevent new Date() hydration mismatches
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <main className="w-full h-full flex flex-col items-center justify-center animate-fade-in-up">
        { /* Added responsive container for the calendar */ }
        <div className="w-full max-w-5xl">
          <CalendarShell />
        </div>
      </main>
    </div>
  );
}
