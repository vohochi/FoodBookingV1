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

// Define Session type
export interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// Create the context with extended functionality
const ReservationContext = createContext<{
  range: ReservationRange;
  setRange: React.Dispatch<React.SetStateAction<ReservationRange>>;
  resetRange: () => void;
  session?: Session | null;
  setSession?: React.Dispatch<React.SetStateAction<Session | null>>;
} | null>(null);

// Define the initial state
const initialState: ReservationRange = { from: undefined, to: undefined };
const initialSession: Session | null = null;

// Provider component
export default function ReservationProviderAuth({
  children,
  initialSession: providedSession,
}: {
  children: React.ReactNode;
  initialSession?: Session | null;
}) {
  const [range, setRange] = useState<ReservationRange>(initialState);
  const [session, setSession] = useState<Session | null>(
    providedSession || initialSession
  );

  const resetRange = () => setRange(initialState);

  return (
    <Provider store={store}>
      <ReservationContext.Provider
        value={{
          range,
          setRange,
          resetRange,
          session,
          setSession,
        }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </ReservationContext.Provider>
    </Provider>
  );
}

// Hook to access the context
export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === null) {
    throw new Error('Context was used outside provider');
  }
  return context;
}

// Optional: Specialized hook for session management
export function useSession() {
  const context = useReservation();
  return {
    session: context.session,
    setSession: context.setSession,
  };
}
