"use client";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

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

const Login2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer title="Login" description="Login page with animated quote slider">
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Left Side - Login Form */}
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
          <Box sx={{ width: "100%", maxWidth: "480px" }}>
            <Box display="flex" alignItems="center" mb={4}>
              <Logo />
            </Box>
            <Typography variant="h3" fontWeight="700" mb={1}>
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={4}>
              Enter your credentials to access your account
            </Typography>

            <AuthLogin
              subtext={<></>}
              subtitle={
                <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                  <Typography color="textSecondary" variant="body1">
                    New to The A Team?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/register"
                    fontWeight="600"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Box>

        {/* Right Side - Image Slider */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            display: { xs: "none", md: "block" },
            overflow: "hidden",
          }}
        >
          {/* Background Images */}
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
                "linear-gradient(135deg, rgba(25,118,210,0.85) 0%, rgba(13,71,161,0.85) 100%)",
              zIndex: 1,
            }}
          />

          {/* Quote Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: 6,
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="300"
              sx={{
                opacity: 1,
                transition: "opacity 1s ease-in-out",
                lineHeight: 1.6,
                fontStyle: "italic",
                maxWidth: 600,
                mb: 3,
              }}
            >
                &quot;{slides[currentSlide].quote}&quot;
            </Typography>
            {/* <Typography
              variant="h6"
              fontWeight="500"
              sx={{
                transition: "opacity 1s ease-in-out 0.3s",
              }}
            >
              — {slides[currentSlide].author}
            </Typography> */}

            {/* Slide Indicators */}
            <Stack direction="row" spacing={1} justifyContent="center" mt={6}>
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
                        : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "white" },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Login2;
