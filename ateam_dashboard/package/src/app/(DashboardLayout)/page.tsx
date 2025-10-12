"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import StudentProgressiveOverview from "@/app/(DashboardLayout)/components/dashboard/StudentProgressiveOverview";
import PerformanceDistribution from "@/app/(DashboardLayout)/components/dashboard/PerformanceDistribution";
import ParentFeedbackTrend from "@/app/(DashboardLayout)/components/dashboard/ParentFeedbackTrend";
import TopPerformers from "@/app/(DashboardLayout)/components/dashboard/TopPerformers";
import BatchPerformance from "@/app/(DashboardLayout)/components/dashboard/BatchPerformance";
const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <StudentProgressiveOverview />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <PerformanceDistribution />
              </Grid>
              <Grid size={12}>
                <ParentFeedbackTrend />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <TopPerformers />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <BatchPerformance />
          </Grid>
          {/* <Grid size={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
