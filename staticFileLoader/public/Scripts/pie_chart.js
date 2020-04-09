var data = [10,10,10,10,10,10,10,10,10,10];

var svg = d3.select("#svg_pie"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width/2 + "," + height/2 + ")");

var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c','#7CA39D','#FF253E','#1FB8A3','#8365B8','#AFAB3B']);


var pie = d3.pie();


var path = d3.arc().outerRadius(radius - 10).innerRadius(0);

var label = d3.arc().outerRadius(radius).innerRadius(radius - 150);

var arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class","arc");

arcs.append("path").attr("d",path).attr("fill",function (d,i) {
    return color(i);
}).append("title").text(function (d,i) {
        return data[i] + "%";
    });

console.log(arcs)

var legend = d3.select(".legend_pie");
legend.selectAll(".legend_content").data(data).enter().append("div").attr("class","legend_content");

var legend_content = d3.selectAll(".legend_content");
legend_content.append("div").attr("class","legend_color");

legend_content.append("div").attr("class","legend_info");

var legend_color = d3.selectAll(".legend_color");
legend_color.data(data).style("background-color",function (d,i) {
    return color(i);
});

var legend_info = d3.selectAll(".legend_info");
legend_info.data(data).append("text").text(function (d,i) {
    var details = data[i] * 10;
    return parseInt(details) + " accidents";
});
