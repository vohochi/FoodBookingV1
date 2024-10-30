'use client';
import { Grid, Box } from '@mui/material';

// components
import PageContainer from '@/_components/container/PageContainer';
import ProductSales from '@/_components/dashboard/ProductSales';
// import Blog from '@/_components/dashboard/Blog';
import TopPayingClients from '@/_components/dashboard/TopPayingClients';
import UpcomingSchedules from '@/_components/dashboard/UpcomingSchedules';
import TrafficDistribution from '@/_components/dashboard/TrafficDistribution';
import ProfitExpenses from '@/_components/dashboard/ProfitExpenses';
const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ProfitExpenses />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TrafficDistribution />
              </Grid>
              <Grid item xs={12}>
                <ProductSales />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <UpcomingSchedules />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TopPayingClients />
          </Grid>
          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
