var info ="<accidents>"
      +"<accident id=\"1\">Right lane blocked due to accident on I-70 Eastbound at Exit 41 OH-235 State Route 4.</accident>"
      +"<accident id=\"2\">Accident on Brice Rd at Tussing Rd. Expect delays.</accident>"
      +"<accident id=\"3\">One lane blocked due to accident on I-70 Westbound at Exits 110 110A 110B Brice Rd. Expect delays.</accident>"
      +"<accident id=\"4\">Queuing traffic around a bend in the road due to accident on Story Rd Northbound at US-101.</accident>"
      + "<accident id=\"5\">HOV lane blocked due to accident on US-101 Southbound at Exit 382 Capitol Expy.</accident>"
      + "<accident id=\"6\">Slow traffic due to accident on I-880 Northbound at Exit 38 / Coliseum Way / Oakport St.</accident>"
      + "<accident id=\"7\">Middle lane blocked due to accident on CA-26 Fremont St Southbound at CA-99.</accident>"
      + "<accident id=\"8\">Slow traffic due to accident on I-80 Eastbound at Exit 4A / Treasure Island Ofr.</accident>"
      + "<accident id=\"9\">Accident on Lakeville Hwy Westbound at Old Lakeville No 2 Rd.</accident>"
      + "<accident id=\"10\">Lane blocked due to accident on CA-92 Jackson St Eastbound at Exit 25B Hesperian Blvd.</accident>"
      + "</accidents>"

var value = 0;
var parser = new DOMParser();
var xmlDoc = parser.parseFromString(info, "text/xml");
var x = xmlDoc.getElementsByTagName("accident")
var element;


document.addEventListener("DOMContentLoaded", 
function changeElements(){
    if(value == 4)
    value = 0
    for(let i= 1 ;i<=6;i++){      
        element=document.getElementById("news"+i)
        element.innerHTML = x[i+value].firstChild.nodeValue.substring(0,35) + "..." + "<a class =\"read_more\" href=\"index.html\"><small><i>Read More</i></small</a>"
    }
    setTimeout(function(){
    for(let i= 1 ;i<=6;i++){      
        element=document.getElementById("news"+i)
        element.innerHTML = x[value+i].firstChild.nodeValue.substring(0,35) +"..."+ "<a class =\"read_more\" href=\"index.html\"><small><i>Read More</i></small></a>"
    }
    value +=1
    if(value < 10)
        changeElements()
    },10000)
})