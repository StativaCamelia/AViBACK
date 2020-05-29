document.addEventListener("DOMContentLoaded", domloaded, false);
function domloaded() {
  var canvas = document.getElementById("bar_chart");
  var ctx = canvas.getContext("2d");
  Chart.defaults.global.defaultFontSize = 12;
  var data = {
    labels: [2016, 2017, 2018, 2019],
    datasets: [],
  };

  var myBarChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      title: {
        display: true,
        text: "Enter your data an generate a bar chart",
      },
      legend: {
        fontSize: 10,
        fontFamily: "tamoha",
        fontColor: "Sienna",
      },
    },
  });
}
