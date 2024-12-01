import React from 'react';
import { Snackbar, Alert, AlertProps, Slide } from '@mui/material';
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

interface SnackbarAlertProps {
  snackbarOpen: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  snackbarOnclose: () => void;
}

const SnackbarNotification: React.FC<SnackbarAlertProps> = ({ snackbarOpen, message, severity, snackbarOnclose }) => {
  const alertStyles: Record<SnackbarAlertProps['severity'], AlertProps['sx']> = {
    success: { backgroundColor: '#ffffff', color: '#101010', border: '1px solid #ffffff' },
    error: { backgroundColor: '#ffffff', color: '#101010', border: '1px solid #ffffff' },
    info: { backgroundColor: '#ffffff', color: '#101010', border: '1px solid #ffffff' },
    warning: { backgroundColor: '#ffffff', color: '#101010', border: '1px solid #ffffff' },
  };

  const iconStyles = {
    success: { color: '#4caf50' },
    error: { color: '#f44336' },
    info: { color: '#2196f3' },
    warning: { color: '#ff9800' },
  };

  const iconMapping: Record<SnackbarAlertProps['severity'], React.ReactNode> = {
    success: <CheckCircle sx={iconStyles.success} />,
    error: <Error sx={iconStyles.error} />,
    info: <Info sx={iconStyles.info} />,
    warning: <Warning sx={iconStyles.warning} />,
  };

  const SlideTransition = React.forwardRef(function SlideTransition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
  ) {
    return <Slide {...props} ref={ref} direction="down" />;
  });



  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={snackbarOnclose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={snackbarOnclose}
        severity={severity}
        icon={iconMapping[severity]}
        sx={{
          width: '100%',
          ...alertStyles[severity],
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
