"use client";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const slides = [
  {
    image: "/statistics.png",
    quote: "Introducing AIKO - Your Child's Learning Partner",
    author: "Winston Churchill",
  },
  {
    image: "/ailearning.png",
    quote: "At A Team Academy, we believe every child is born curious and capable of greatness.",
    author: "Steve Jobs",
  },
  {
    image: "/abacus.png",
    quote: "Shaping Young Minds with the Power of AI",
    author: "Steve Jobs",
  },
  {
    image: "/skill.png",
    quote: "At A Team Academy, we combine the best of traditional learning like Abacus, Phonics, and Vedic Math with the power of AI",
    author: "Anonymous",
  },
];

const Register2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Ensure this code only runs on the client
  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer title="Register" description="this is Register page">
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Left Side - Registration Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: 3, md: 6 },
            backgroundColor: "#ffffff",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "480px", py: 4 }}>
            <Box display="flex" alignItems="center" mb={4}>
              <Logo />
            </Box>
            <Typography variant="h3" fontWeight="700" mb={1}>
              Get Started
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              mb={4}
              fontWeight="400"
            >
              Create your account to join The A Team
            </Typography>
            <AuthRegister
              subtext={<></>}
              subtitle={
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt={3}
                >
                  <Typography
                    color="textSecondary"
                    variant="body1"
                    fontWeight="400"
                  >
                    Already have an Account?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/login"
                    fontWeight="600"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Box>

        {/* Right Side - Image Slider with Blue Overlay */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            display: { xs: "none", md: "block" },
            overflow: "hidden",
          }}
        >
          {/* Sliding Images */}
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: currentSlide === index ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          ))}

          {/* Blue Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(25, 118, 210, 0.85) 0%, rgba(13, 71, 161, 0.85) 100%)",
              zIndex: 1,
            }}
          />

          {/* Quote Content */}
          {mounted && (
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 6,
                color: "white",
              }}
            >
              <Box sx={{ maxWidth: "600px", textAlign: "center" }}>
                <Typography
                  variant="h3"
                  fontWeight="300"
                  mb={3}
                  sx={{
                    transition: "opacity 1s ease-in-out 0.3s",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  &quot;{slides[currentSlide].quote}&quot;
                </Typography>

  

                {/* Slide Indicators */}
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt={6}
                >
                  {slides.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      sx={{
                        width: currentSlide === index ? 40 : 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor:
                          currentSlide === index
                            ? "white"
                            : "rgba(255, 255, 255, 0.5)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Register2;
