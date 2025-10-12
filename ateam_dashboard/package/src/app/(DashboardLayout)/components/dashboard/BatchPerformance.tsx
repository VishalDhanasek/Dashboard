"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const BatchPerformance = () => {
  const [batches, setBatches] = useState<
    { batch: string; avgAttendance: number }[]
  >([]);
  const theme = useTheme();
  const secondary = theme.palette.primary.main;

  useEffect(() => {
    fetch("Phonics.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const data: any = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        const grouped: Record<string, number[]> = {};

        data.forEach((d: any) => {
          const b = d.Batch_Name;
          if (!grouped[b]) grouped[b] = [];
          grouped[b].push(Number(d.Attendance_Percentage));
        });

        const result = Object.entries(grouped).map(([name, attendance]) => ({
          batch: name,
          avgAttendance:
            attendance.reduce((a, b) => a + b, 0) / attendance.length,
        }));

        setBatches(result);
      });
  }, []);

  const options: any = {
    chart: { type: "bar", stacked: false },
    colors: [secondary],
    xaxis: { categories: batches.map((b) => b.batch) },
    legend: { show: false },
  };

  const series = [
    {
      name: "Attendance %",
      data: batches.map((b) => Number(b.avgAttendance.toFixed(1))),
    },
  ];

  return (
    <DashboardCard title="Batch Attendance Comparison">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
        width="100%"
      />
    </DashboardCard>
  );
};

export default BatchPerformance;
