'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Box } from '@mui/material';
import TopPayingClients from '@/app/_components/dashboard/TopPayingClients';

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Grid item xs={12} lg={8}>
        <TopPayingClients />
      </Grid>
    </Paper>
  );
}
