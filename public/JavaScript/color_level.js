var levels = ["high_s", "medium_s", "low_s"]

document.addEventListener("DOMContentLoaded", 
function showPop(event){
var svgStates = document.querySelectorAll("#states > *");
var pop = document.getElementById("states_pop");
svgStates.forEach(function(el)
{
  var num = Math.floor(Math.random() * 3);
  el.setAttribute("class",levels[num]);
})
})