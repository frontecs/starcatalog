import styles from "@/styles/elev/Dashboard.module.css";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Medie() {
  const [chartData, setChartData] = useState(null);
  const [medieGenerala, setMedieGenerala] = useState(1);

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        display: true,
        title: {
          display: true,
          text: "Dată",
          color: "black",
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Medie Generală",
          color: "black",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Medie Generală - " + medieGenerala,
        color: "black",
      },
    },
  };

  useEffect(() => {
    fetch("/api/elev/getMedie", {
      headers: {
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const latestEntries = data.reduce((acc, current) => {
          const date = current.created_at.split("T")[0];
          acc[date] = current;
          return acc;
        }, {});

        const labels = Object.values(latestEntries).map(
          (item) => new Date(item.created_at)
        );
        const averages = Object.values(latestEntries).map(
          (item) => item.average
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Medie Generală",
              data: averages,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
            },
          ],
        });

        setMedieGenerala(averages[averages.length - 1].toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!chartData) {
    return <div />;
  }

  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={chartData} />
    </div>
  );
}
