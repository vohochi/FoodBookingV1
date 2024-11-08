'use client';

import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, Container, Box } from '@mui/material';

import Header from '@/layout/header/Header';
import Sidebar from '@/layout/sidebar/Sidebar';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import ReservationProviderAdmin from '@/_components/ReservationContextAdmin';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  padding: '20px',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Function to handle toggling the sidebar
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <head />
      <body>
        <ReservationProviderAdmin>
          {' '}
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            <MainWrapper className="mainwrapper">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
              />

              <PageWrapper className="page-wrapper">
                <Container maxWidth="lg">
                  <Header
                    toggleMobileSidebar={() => handleSidebarToggle}
                    // toggleSidebar={handleSidebarToggle} // Pass the function to Header
                  />
                  <Box sx={{ minHeight: 'calc(100vh - 170px)', py: 3 }}>
                    {children}
                  </Box>
                </Container>
              </PageWrapper>
            </MainWrapper>
          </ThemeProvider>
        </ReservationProviderAdmin>
      </body>
    </html>
  );
}
