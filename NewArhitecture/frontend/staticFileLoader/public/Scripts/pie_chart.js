document.addEventListener("DOMContentLoaded",function () {
    const data = [100];

    let svg = d3.select("#svg_pie"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    const color = d3.scaleOrdinal(['#394690']);


    let pie = d3.pie();


    let path = d3.arc().outerRadius(radius - 10).innerRadius(0);

    let label = d3.arc().outerRadius(radius).innerRadius(radius - 150);

    let arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class","arc");

    arcs.append("path").attr("d",path).attr("fill",function (d,i) {
        return color(i);
    }).append("title").text(function (d,i) {
        return data[i] + "%";
    });

});