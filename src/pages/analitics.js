import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, defaults } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "black",
        font: {
          family: "MonumentBold", // Add your font here to change the font of your legend label
        },
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Midjourney",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dall-e 2",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Analitics() {
  return (
    <Wrapper>
      <Bar
        options={options}
        data={data}
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 6rem auto;
  font-family: "monument";
`;
