"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const PerformanceDistribution = () => {
  const [stats, setStats] = useState({ male: 0, female: 0 });
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = "#1E90FF";

  useEffect(() => {
    fetch("Phonics.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const data: any = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        const male = data.filter((d: any) => d.Gender === "M").length;
        const female = data.filter((d: any) => d.Gender === "F").length;
        setStats({ male, female });
      });
  }, []);

  const options: any = {
    chart: { type: "donut", height: 200 },
    colors: [primary, secondary],
    labels: ["Male", "Female"],
    legend: { position: "bottom" },
  };

  const series = [stats.male, stats.female];

  return (
    <DashboardCard title="Gender Distribution">
      <Chart
        options={options}
        series={series}
        type="donut"
        height={180}
        width="100%"
      />
    </DashboardCard>
  );
};

export default PerformanceDistribution;
