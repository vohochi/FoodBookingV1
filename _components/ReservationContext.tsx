'use client';

import { createContext, useContext, useState } from 'react';

// Define the type for the reservation range
interface ReservationRange {
  from?: Date;
  to?: Date;
}

// Create the context
const ReservationContext = createContext<{
  range: ReservationRange;
  setRange: React.Dispatch<React.SetStateAction<ReservationRange>>;
  resetRange: () => void;
} | null>(null);

// Define the initial state
const initialState: ReservationRange = { from: undefined, to: undefined };

// Provider component
function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<ReservationRange>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

// Hook to access the context
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === null) {
    throw new Error('Context was used outside provider');
  }
  return context;
}

export { ReservationProvider, useReservation };
