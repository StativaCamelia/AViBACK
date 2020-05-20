document.addEventListener("DOMContentLoaded", domloaded, false);
function domloaded() {
  var canvas = document.getElementById("line_chart");
  var ctx = canvas.getContext("2d");
  Chart.defaults.global.defaultFontSize = 16;
  var data = {
    labels: [2016, 2017, 2018, 2019],
    datasets: [
      {
        data: [86, 114, 106, 106],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: [282, 350, 411, 502],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false,
      },
      {
        data: [168, 170, 178, 190],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false,
      },
      {
        data: [40, 20, 10, 16, 24],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false,
      },
      {
        data: [6, 3, 2, 2, 7],
        label: "North America",
        borderColor: "#c45850",
        fill: false,
      },
    ],
  };

  var myFirstChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      title: {
        display: true,
        text: "Enter your data an generate a line chart",
      },
    },
  });
}
