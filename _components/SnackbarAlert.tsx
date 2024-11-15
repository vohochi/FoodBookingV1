import React from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const SnackbarNotification: React.FC<SnackbarAlertProps> = ({ open, message, severity, onClose }) => {
  const alertStyles: Record<SnackbarAlertProps['severity'], AlertProps['sx']> = {
    success: { backgroundColor: '#4caf50', color: '#fff', borderColor: '#388e3c' },
    error: { backgroundColor: '#f44336', color: '#fff', borderColor: '#d32f2f' },
    info: { backgroundColor: '#2196f3', color: '#fff', borderColor: '#1976d2' },
    warning: { backgroundColor: '#ff9800', color: '#fff', borderColor: '#f57c00' },
  };

  const iconStyles = {
    success: { color: '#ffffff' },
    error: { color: '#ffffff' },
    info: { color: '#ffffff' },
    warning: { color: '#ffffff' },
  };

  const iconMapping: Record<SnackbarAlertProps['severity'], React.ReactNode> = {
    success: <CheckCircle sx={iconStyles.success} />,
    error: <Error sx={iconStyles.error} />,
    info: <Info sx={iconStyles.info} />,
    warning: <Warning sx={iconStyles.warning} />,
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        icon={iconMapping[severity]}
        sx={{
          width: '100%',
          ...alertStyles[severity],
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          border: '1px solid', 
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
