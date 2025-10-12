'use client';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const ParentFeedbackStars = () => {
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const theme = useTheme();

  useEffect(() => {
    fetch('/Phonics.xlsx') // Ensure file is in public folder
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        const scores = data
          .map(d => Number(d.Parent_Feedback_Score))
          .filter(s => !isNaN(s) && s > 0);
        const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
        setAvgRating(avg);
      })
      .catch(err => console.error('Error loading Excel:', err));
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<StarIcon key={i} sx={{ color: theme.palette.primary.main, fontSize: 40 }} />);
      } else if (rating >= i - 0.5) {
        stars.push(<StarHalfIcon key={i} sx={{ color: theme.palette.primary.main, fontSize: 40 }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: theme.palette.primary.main, fontSize: 40 }} />);
      }
    }
    return stars;
  };

  return (
    <DashboardCard title="Parent Feedback Rating">
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        {avgRating !== null ? (
          <>
            <Box display="flex">{renderStars(avgRating)}</Box>
            <Typography variant="subtitle1" mt={1}>
              {avgRating.toFixed(2)} / 5
            </Typography>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </DashboardCard>
  );
};

export default ParentFeedbackStars;
