var levels = ["high_s", "medium_s", "low_s"];

document.addEventListener("DOMContentLoaded", function showPop(event) {
  var svgStates = document.querySelectorAll("#states > *");
  svgStates.forEach(function (el) {
    el.setAttribute("class", levels[2]);
  });
});
