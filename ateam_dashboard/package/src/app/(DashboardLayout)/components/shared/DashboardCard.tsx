import React from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode | any;
  footer?: React.ReactNode;
  cardheading?: string | React.ReactNode;
  headtitle?: string | React.ReactNode;
  headsubtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  middlecontent?: string | React.ReactNode;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}: Props) => {
  return (
    <Card 
      sx={{ 
        padding: 0,
        // Enhanced glassy effect with visible styling
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.85) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1.5px solid rgba(200, 220, 255, 0.6)',
        boxShadow: `
          0 8px 32px 0 rgba(100, 149, 237, 0.12),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
          0 0 0 1px rgba(230, 240, 255, 0.3)
        `,
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)',
          borderRadius: '20px 20px 0 0',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(102, 126, 234, 0.03), transparent 70%)',
          pointerEvents: 'none',
        },
        '&:hover': {
          boxShadow: `
            0 12px 48px 0 rgba(100, 149, 237, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.95),
            0 0 0 1.5px rgba(102, 126, 234, 0.2)
          `,
          transform: 'translateY(-4px)',
          border: '1.5px solid rgba(102, 126, 234, 0.4)',
        }
      }} 
      elevation={0}
      variant={undefined}
    >
      {cardheading ? (
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h5"
            sx={{
              background: 'linear-gradient(135deg, #5e72e4 0%, #825ee4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600
            }}
          >
            {headtitle}
          </Typography>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'rgba(94, 114, 228, 0.7)',
              mt: 0.5
            }}
          >
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px", position: 'relative', zIndex: 1 }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title ? (
                  <Typography 
                    variant="h5"
                    sx={{
                      background: 'linear-gradient(135deg, #5e72e4 0%, #825ee4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 1px rgba(94, 114, 228, 0.1)'
                    }}
                  >
                    {title}
                  </Typography>
                ) : ""}

                {subtitle ? (
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: 'rgba(94, 114, 228, 0.65)',
                      mt: 0.5,
                      fontWeight: 500
                    }}
                  >
                    {subtitle}
                  </Typography>
                ) : ""}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;