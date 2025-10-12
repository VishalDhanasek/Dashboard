"use client";
import { useEffect, useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as XLSX from "xlsx";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
// Define the student type
interface Student {
  Student_Name?: string;
  Batch_Name?: string;
  Level_1_Score?: number;
  Level_2_Score?: number;
  Level_3_Score?: number;
  Level_4_Score?: number;
  Level_5_Score?: number;
  Level_6_Score?: number;
  Final_Assessment_Score?: number;
  Avg_Score: number;
}

// Rank colors (1–5)
const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32", "#1976d2", "#9c27b0"]; // Gold, Silver, Bronze, Blue, Purple

const TopPerformers = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<string[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");

  useEffect(() => {
    fetch("Phonics.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const data: any[] = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        // Map and calculate average score
        const withAvg: Student[] = data.map((student: any) => {
          const scores: number[] = [
            student.Level_1_Score,
            student.Level_2_Score,
            student.Level_3_Score,
            student.Level_4_Score,
            student.Level_5_Score,
            student.Level_6_Score,
            student.Final_Assessment_Score,
          ].map((s: any) => Number(s) || 0);

          const avgScore =
            scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
          return { ...student, Avg_Score: avgScore };
        });

        setStudents(withAvg);

        // Extract unique batches
        const uniqueBatches = Array.from(
          new Set(withAvg.map((s) => s.Batch_Name || "Unknown"))
        );
        setBatches(uniqueBatches);
        setSelectedBatch(uniqueBatches[0] || "");
      });
  }, []);

  const handleBatchChange = (event: SelectChangeEvent) => {
    setSelectedBatch(event.target.value);
  };

  // Filter top 5 students for the selected batch
  const topStudents = students
    .filter((s) => (s.Batch_Name || "Unknown") === selectedBatch)
    .sort((a, b) => b.Avg_Score - a.Avg_Score)
    .slice(0, 3);

  return (
    <DashboardCard title="Top Performing Students">
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="batch-select-label">Select Batch</InputLabel>
        <Select
          labelId="batch-select-label"
          value={selectedBatch}
          label="Select Batch"
          onChange={handleBatchChange}
        >
          {batches.map((batch) => (
            <MenuItem key={batch} value={batch}>
              {batch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Timeline
        sx={{
          p: 0,
          "& .MuiTimelineConnector-root": {
            width: "2px",
            backgroundColor: "#efefef",
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
            paddingLeft: 0,
          },
        }}
      >
        {topStudents.map((student, i) => (
          <TimelineItem key={i}>
            <TimelineOppositeContent>
              <Typography
                fontWeight="700"
                sx={{ color: rankColors[i] || "grey", fontSize: "1.2rem" }}
              >
                {i + 1}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: rankColors[i] || "grey" }} />
              {i < topStudents.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">
                {student.Student_Name || "Unknown"}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default TopPerformers;
