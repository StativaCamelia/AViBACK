var i = 0;
var stop;
var speed;
var ind;
document.addEventListener("DOMContentLoaded", function counterInc(event,number = ) {
  const count = document.querySelector(".counter_numbers p");
  const target = count.getAttribute("data-target");
  console.log(target);
  setTimeout(function () {
    count.innerHTML = i;
    i += 10;
    if (i <= target) {
      counterInc();
    }
    
  }, 3);
});
