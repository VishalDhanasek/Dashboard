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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    quote: "Your limitation—it's only your imagination.",
    author: "Anonymous"
  },
  {
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    quote: "Dream bigger. Do bigger.",
    author: "Anonymous"
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Anonymous"
  }
];

const Register2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
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

export default Register2;