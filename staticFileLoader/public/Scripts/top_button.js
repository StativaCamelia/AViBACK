document.addEventListener("DOMContentLoaded", function topButtonFunction(event) {
    var topbutton = document.getElementById("top_button");
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
           topbutton.style.display = "block";
        } else {
            topbutton.style.display = "none";
        }
    }

    topbutton.addEventListener('click',function topFunction(event) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
})