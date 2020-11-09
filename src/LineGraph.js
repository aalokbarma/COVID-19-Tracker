import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  let color1a = 'rgba(255, 53, 2, 0.534)';
  let color1b = 'rgb(255, 60, 0)';
  const [data, setData] = useState({});
  {
    if (casesType === "cases"){
      color1a = 'rgba(255, 53, 2, 0.534)';
      color1b = 'rgb(255, 60, 0)';
    } else if (casesType === "recovered"){
      color1a = 'rgba(2, 255, 23, 0.534)';
      color1b = '#0f0'
    } else if (casesType === "deaths"){
      color1a = 'rgba(255, 0, 0, 0.534)';
      color1b = '#f00';
    }
  }
  
  

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
    
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                
                backgroundColor: color1a,
                borderColor: color1b,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;






// import React from 'react';

// import LCases from './LCases';
// import LRecovered from './LRecovered';
// import LDeaths from './LDeaths';

// function LineGraph({ casesType }) {
//   return({
//     if(casesType = "cases"){
//       return(
//         <LCases />
//       )
//     }, else if (casesType = "recovered") {
//       return(
//         <LRecovered />
//       )
//     }, else if (casesType = "deaths") {
//       return(
//         <LDeaths />
//       )
//     }
//   }

//   }

//   )

// export default LineGraph;