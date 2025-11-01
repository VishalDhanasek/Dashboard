"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

const slides = [
  {
    image: "/statistics.png",
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    image: "/ailearning.png",
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    image: "/abacus.png",
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    image: "/skill.png",
    quote: "Great things never come from comfort zones.",
    author: "Anonymous"
  }
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
    <PageContainer title="Login" description="this is Login page">
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
            <Typography
              variant="subtitle1"
              color="textSecondary"
              mb={4}
              fontWeight="400"
            >
              Enter your credentials to access your account
            </Typography>
            <AuthLogin
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
                    New to The A Team?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/register"
                    fontWeight="600"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Create an account
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
              background: "linear-gradient(135deg, rgba(25, 118, 210, 0.85) 0%, rgba(13, 71, 161, 0.85) 100%)",
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
                  opacity: currentSlide === currentSlide ? 1 : 0,
                  transition: "opacity 1s ease-in-out 0.3s",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "{slides[currentSlide].quote}"
              </Typography>
              <Typography
                variant="h6"
                fontWeight="500"
                sx={{
                  opacity: currentSlide === currentSlide ? 1 : 0,
                  transition: "opacity 1s ease-in-out 0.5s",
                }}
              >
                — {slides[currentSlide].author}
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
                      backgroundColor: currentSlide === index
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
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Login2;