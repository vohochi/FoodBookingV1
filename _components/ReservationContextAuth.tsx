'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { createContext, useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';

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
export default function ReservationProviderAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<ReservationRange>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <Provider store={store}>
      <ReservationContext.Provider value={{ range, setRange, resetRange }}>
        <Toaster /> {/* Add Toaster here */}
        {children}
      </ReservationContext.Provider>
    </Provider>
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
export { useReservation };
