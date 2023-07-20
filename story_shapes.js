let storyShapes = {
    "man-in-hole": Array.from({length: 100}, (_, i) => ({x: i / 99, y: i < 50 ? 1 - 2 * i / 49 : -1 + 2 * (i - 50) / 49})),
    "boy-meets-girl": Array.from({length: 100}, (_, i) => ({x: i / 99, y: i < 25 ? 1 - 4 * i / 99 : (i < 50 ? -1 + 4 * (i - 25) / 99 : (i < 75 ? 1 - 4 * (i - 50) / 99 : -1 + 4 * (i - 75) / 99))})),
    "kafkaesque": Array.from({length: 100}, (_, i) => ({x: i / 99, y: 1 - 2 * i / 99})),
    "hamlet": Array.from({length: 100}, (_, i) => ({x: i / 99, y: Math.sin(i / 99 * 2 * Math.PI)})),
    "cinderella": Array.from({length: 100}, (_, i) => ({x: i / 99, y: i < 25 ? -1 : (i < 50 ? -1 + 2 * (i - 25) / 25 : (i < 75 ? 1 - 2.8 * (i - 50) / 25 : -0.4 + 2.4 * (i - 75) / 25))}))
};

let svg = d3.select("#story-graph")
    .append("svg")
    .attr("width", 800)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate(50,50)");

let x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 700]);

let y = d3.scaleLinear()
    .domain([-1, 2])
    .range([300, 0]);

let xAxis = d3.axisBottom(x).ticks(0);
let yAxis = d3.axisLeft(y).ticks(0);

svg.append("g")
    .attr("transform", "translate(0,300)")
    .call(xAxis);

svg.append("g")
    .call(yAxis);

let line = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

let colors = ["blue", "red", "green", "purple", "orange"];
let i = 0;

for (let storyType in storyShapes) {
    svg.append("path")
        .datum(storyShapes[storyType])
        .attr("class", "line")
        .attr("id", storyType)
        .attr("d", line)
        .attr("stroke", colors[i])
        .style("display", "none");
    i++;
}



function toggleLine(id) {
    let line = d3.select("#" + id);
    let display = line.style("display");
    if (display === "none") {
        line.style("display", "inline");
    }
}

