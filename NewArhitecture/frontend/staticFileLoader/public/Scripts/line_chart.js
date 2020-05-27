document.addEventListener("DOMContentLoaded", domloaded, false);
function domloaded() {
  var canvas = document.getElementById("line_chart");
  var ctx = canvas.getContext("2d");
  Chart.defaults.global.defaultFontSize = 12;
  var data = {
    labels: [2016, 2017, 2018, 2019],
    datasets: [],
  };

  var myFirstChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      title: {
        display: true,
        text: "Enter your data an generate a line chart",
      },
      legend: {
        fontSize: 10,
        fontFamily: "tamoha",
        fontColor: "Sienna",
      },
    },
  });
}
