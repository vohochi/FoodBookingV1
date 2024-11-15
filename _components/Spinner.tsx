'use client'

import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true); // Show the spinner after 2 seconds
    }, 2000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="spinner-container">
      {showSpinner && <CircularProgress />} {/* Show spinner after 2 seconds */}
    </div>
  );
}

export default Spinner;
