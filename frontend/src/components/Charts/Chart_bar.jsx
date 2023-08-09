import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export function ApexChart({ isLoading, data }) {
  const [state, setState] = useState({
    series: [
      {
        name: "Revenue",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#6366F1",
      },
      {
        name: "Free Cash Flow",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#D8D9FB",
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded",
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      yaxis: {
        labels: {
          formatter: (val) => {
            return val > 1000 ? `${(val / 1000).toFixed(1)}k` : val;
          },
          style: {
            colors: "#9CA3AF",
            fontSize: "11px",
            fontFamily: "poppins",
          },
        },
      },
      tooltip: {
        x: {
          show: false,
        },
      },
      grid: {
        borderColor: "#f6f6f6",
      },
      toolbar: {
        show: false,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: {
          style: {
            colors: "#9CA3AF",
            fontSize: "11px",
            fontFamily: "poppins",
          },
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setState({
        series: [
          {
            name: "Revenue",
            data: [
              data[0].balance,
              data[1].balance,
              data[2].balance,
              data[3].balance,
              data[4].balance,
              data[5].balance,
              data[6].balance,
              data[6].balance,
              data[8].balance,
              data[9].balance,
              data[10].balance,
              data[11].balance,
            ],
            color: "#6366F1",
          },
          {
            name: "Free Cash Flow",
            data: [
              data[0].balance / 3,
              data[1].balance / 3,
              data[2].balance / 3,
              data[3].balance / 3,
              data[4].balance / 3,
              data[5].balance / 3,
              data[6].balance / 3,
              data[7].balance / 3,
              data[8].balance / 3,
              data[9].balance / 3,
              data[10].balance / 3,
              data[11].balance / 3,
            ],
            color: "#D8D9FB",
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "40%",
              endingShape: "rounded",
            },
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          yaxis: {
            labels: {
              formatter: (val) => {
                return val > 1000 ? `${(val / 1000).toFixed(1)}k` : val;
              },
              style: {
                colors: "#9CA3AF",
                fontSize: "11px",
                fontFamily: "poppins",
              },
            },
          },
          tooltip: {
            x: {
              show: false,
            },
          },
          grid: {
            borderColor: "#f6f6f6",
          },
          toolbar: {
            show: false,
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            labels: {
              style: {
                colors: "#9CA3AF",
                fontSize: "11px",
                fontFamily: "poppins",
              },
            },
          },
          fill: {
            opacity: 1,
          },
        },
      });
    }
  }, [isLoading]);

  return <Chart options={state.options} series={state.series} type="bar" height={400} />;
}

export function ApexChart_donut({ data, isLoading }) {
  const [state, setState] = useState({
    series: [10, 10, 10],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["Table", "Desktop", "Mobile"],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  useEffect(() => {
    if (!isLoading) {
      const ChartData = {
        series: [
          parseInt(
            data.filter((item) => item.device === "Tablet")[0]?.count === undefined ? 0 : data.filter((item) => item.device === "Tablet")[0].count
          ),
          parseInt(
            data.filter((item) => item.device === "Desktop")[0]?.count === undefined ? 0 : data.filter((item) => item.device === "Desktop")[0].count
          ),
          parseInt(
            data.filter((item) => item.device === "Mobile")[0]?.count === undefined ? 0 : data.filter((item) => item.device === "Mobile")[0].count
          ),
        ],
        options: {
          chart: {
            width: 380,
            type: "donut",
          },
          labels: ["Table", "Desktop", "Mobile"],
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      };
      setState(ChartData);
    }
  }, [!isLoading]);

  return <Chart options={state.options} series={state.series} type="donut" width={380} />;
}
