'use client'; // Nếu bạn cần sử dụng hooks hoặc state

import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/app/layout/header/Header';
import Sidebar from '@/app/layout/sidebar/Sidebar';
import { styled, Container, Box } from '@mui/material';
import React, { useState } from 'react';
import { baselightTheme } from '@/app/utils/theme/DefaultColors';
import { ThemeProvider } from '@mui/material/styles';

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

  return (
    <html lang="en">
      <head></head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MainWrapper className="mainwrapper">
            {/* ------------------------------------------- */}
            {/* Sidebar */}
            {/* ------------------------------------------- */}
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              onSidebarClose={() => setMobileSidebarOpen(false)}
            />
            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
            <PageWrapper className="page-wrapper">
              <Container
                sx={{
                  maxWidth: '1300px !important',
                }}
              >
                {/* ------------------------------------------- */}
                {/* Header */}
                {/* ------------------------------------------- */}
                <Header
                  toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />
                {/* ------------------------------------------- */}
                {/* Page Route */}
                {/* ------------------------------------------- */}
                <Box sx={{ minHeight: 'calc(100vh - 170px)', py: 3 }}>
                  {children}
                </Box>
                {/* ------------------------------------------- */}
                {/* End Page */}
                {/* ------------------------------------------- */}
              </Container>
            </PageWrapper>
          </MainWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
