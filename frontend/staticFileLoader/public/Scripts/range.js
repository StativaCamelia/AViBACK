var oldSliderVal = -1;
document.addEventListener("DOMContentLoaded", function(){
   var sliderValue = document.getElementsByClassName("slider")[1]
   var outputValue = document.getElementById("hourOUT");
   var slider = document.getElementsByClassName("slider")[1]
   sliderValue.addEventListener("input", function(){
    var sliderPos = slider.getBoundingClientRect();
    var hour;
    var min = this.min;
    var max = this.max;
    var range = max- min;
    var currentVal = this.value;
    if(currentVal < 10)
        hour = "0"+currentVal+"."+"00"
    else
        hour = currentVal + "." +"00"
    outputValue.value = hour;
    outputValue.style.left = sliderPos.left + sliderPos.width/2 - 20 + "px"
   })
 })