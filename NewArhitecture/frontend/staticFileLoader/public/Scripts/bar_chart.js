document.addEventListener("DOMContentLoaded", domloaded, false);
function domloaded() {
  var canvas = document.getElementById("bar_chart");
  var ctx = canvas.getContext("2d");
  Chart.defaults.global.defaultFontSize = 16;
  var data = {
    labels: ["1900", "1950", "1999", "2050"],
    datasets: [
      {
        label: "Africa",
        backgroundColor: "#3e95cd",
        data: [133, 221, 783, 2478],
      },
      {
        label: "Europe",
        backgroundColor: "#8e5ea2",
        data: [408, 547, 675, 734],
      },
    ],
  };

  var myFirstChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      title: {
        display: true,
        text: "Population growth (millions)",
      },
    },
  });
}
