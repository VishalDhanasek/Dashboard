import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  CircularProgress,
} from "@mui/material";

interface StudentData {
  Student_ID: string;
  Student_Name: string;
  Initial_Assessment_Score?: number;
  Level_1_Score?: number;
  Level_2_Score?: number;
  Level_3_Score?: number;
  Level_4_Score?: number;
  Level_5_Score?: number;
  Level_6_Score?: number;
  Final_Assessment_Score?: number;
}

interface ChartPoint {
  Level: string;
  Score: number;
}

const StudentProgressOverview: React.FC = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadExcel = async () => {
      try {
        const response = await fetch("Phonics.xlsx");

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert sheet to JSON
        const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });

        console.log("Raw Excel Data:", rawData);

        // Normalize column names and map to StudentData
        const jsonData: StudentData[] = rawData.map((row) => ({
          Student_ID: String(
            row["Student_ID"] || row["Student_ID "] || ""
          ).trim(),
          Student_Name: String(
            row["Student_Name"] || row["Student_Name "] || ""
          ).trim(),
          Initial_Assessment_Score: Number(
            row["Initial_Assessment_Score"] ||
              row["Initial_Assessment_Score "] ||
              0
          ),
          Level_1_Score: Number(
            row["Level_1_Score"] || row["Level_1_Score "] || 0
          ),
          Level_2_Score: Number(
            row["Level_2_Score"] || row["Level_2_Score "] || 0
          ),
          Level_3_Score: Number(
            row["Level_3_Score"] || row["Level_3_Score "] || 0
          ),
          Level_4_Score: Number(
            row["Level_4_Score"] || row["Level_4_Score "] || 0
          ),
          Level_5_Score: Number(
            row["Level_5_Score"] || row["Level_5_Score "] || 0
          ),
          Level_6_Score: Number(
            row["Level_6_Score"] || row["Level_6_Score "] || 0
          ),
          Final_Assessment_Score: Number(
            row["Final_Assessment_Score"] || row["Final_Assessment_Score "] || 0
          ),
        }));

        setStudents(jsonData);

        if (jsonData.length > 0) {
          setSelectedStudent(jsonData[0].Student_Name);
          setChartData(formatChartData(jsonData[0]));
        }
      } catch (err) {
        console.error("Error reading Excel file:", err);
      } finally {
        setLoading(false);
      }
    };

    loadExcel();
  }, []);

  const formatChartData = (student: StudentData): ChartPoint[] => {
    const levels = [
      { key: "Initial_Assessment_Score", label: "Initial" },
      { key: "Level_1_Score", label: "Level 1" },
      { key: "Level_2_Score", label: "Level 2" },
      { key: "Level_3_Score", label: "Level 3" },
      { key: "Level_4_Score", label: "Level 4" },
      { key: "Level_5_Score", label: "Level 5" },
      { key: "Level_6_Score", label: "Level 6" },
      { key: "Final_Assessment_Score", label: "Final" },
    ];

    return levels.map(({ key, label }) => ({
      Level: label,
      Score: Number((student as any)[key] || 0),
    }));
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.value;
    setSelectedStudent(name);
    const student = students.find((s) => s.Student_Name === name);
    if (student) setChartData(formatChartData(student));
  };

  return (
    <DashboardCard
      title="Student Progress Overview"
      subtitle="Level-wise improvement trend"
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={250}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControl 
            size="small" 
            sx={{ 
              width: 220,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)',
                borderRadius: '10px',
                transition: 'all 0.2s ease',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.25)',
                  borderWidth: '1px',
                },
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.7)',
                  '& fieldset': {
                    borderColor: 'rgba(102, 126, 234, 0.4)',
                  },
                },
                '&.Mui-focused': {
                  background: 'rgba(255, 255, 255, 0.8)',
                  '& fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  },
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(100, 116, 139, 0.7)',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          >
            <InputLabel>Select Student</InputLabel>
            <Select
              value={selectedStudent}
              label="Select Student"
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(230, 240, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(100, 149, 237, 0.15)',
                    borderRadius: '10px',
                    mt: 1,
                    '& .MuiMenuItem-root': {
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.08)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(102, 126, 234, 0.12)',
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.16)',
                        },
                      },
                    },
                  },
                },
              }}
            >
              {students.map((s) => (
                <MenuItem key={s.Student_ID} value={s.Student_Name}>
                  {s.Student_Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          </Box>

          <ResponsiveContainer width="100%" height={370}>
          <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0.9}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(102, 126, 234, 0.08)" 
            strokeWidth={1}
          />
          <XAxis 
            dataKey="Level" 
            stroke="rgba(100, 116, 139, 0.5)"
            style={{ 
              fontSize: '12px',
              fontWeight: 500,
              fill: 'rgba(100, 116, 139, 0.7)'
            }}
            tickLine={{ stroke: 'rgba(102, 126, 234, 0.2)' }}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="rgba(100, 116, 139, 0.5)"
            style={{ 
              fontSize: '12px',
              fontWeight: 500,
              fill: 'rgba(100, 116, 139, 0.7)'
            }}
            tickLine={{ stroke: 'rgba(102, 126, 234, 0.2)' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(230, 240, 255, 0.6)',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.12)',
              padding: '12px 16px',
            }}
            labelStyle={{
              color: '#667eea',
              fontWeight: 600,
              marginBottom: '4px',
            }}
            itemStyle={{
              color: 'rgba(100, 116, 139, 0.9)',
              fontWeight: 500,
            }}
          />
          <Line
            type="monotone"
            dataKey="Score"
            name={`${selectedStudent || "Student"}'s Score`}
            stroke="url(#colorScore)"
            strokeWidth={3}
            dot={{ 
              r: 5, 
              fill: '#667eea',
              strokeWidth: 2,
              stroke: '#fff',
              filter: 'url(#glow)'
            }}
            activeDot={{ 
              r: 8,
              fill: '#764ba2',
              strokeWidth: 3,
              stroke: '#fff',
              filter: 'url(#glow)'
            }}
          />
        </LineChart>

          </ResponsiveContainer>
        </>
      )}
    </DashboardCard>
  );
};

export default StudentProgressOverview;
