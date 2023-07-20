let svg = d3.select("#story-shapes");

// Create x and y scales
let xScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);
let yScale = d3.scaleLinear().domain([-1, 1]).range([400, 0]);

// Line generator
let line = d3.line()
    .x((d, i) => xScale(i / (d.length - 1)))
    .y(d => yScale(d))
    .curve(d3.curveBasis);  // Makes the line curvy

// Story shapes data
let storyShapes = {
    "man-in-hole": Array.from({length: 100}, (_, i) => (i < 50 ? -i / 50 : (i - 50) / 50)),
    "boy-meets-girl": Array.from({length: 100}, (_, i) => (i < 25 ? i / 25 : (i < 75 ? 2 - i / 25 : i / 25 - 2))),
    "kafkaesque": Array.from({length: 100}, (_, i) => -i / 100),
    "hamlet": Array.from({length: 100}, (_, i) => Math.sin(i / 100 * 2 * Math.PI)),
    "cinderella": Array.from({length: 100}, (_, i) => (i < 25 ? i / 25 : (i < 50 ? 1 - (i - 25) / 25 : (i < 75 ? (i - 50) / 25 : 1))))
};

// Draw story shapes
for (let storyType in storyShapes) {
    svg.append("path")
        .datum(storyShapes[storyType])
        .attr("class", "line")
        .attr("id", storyType)
        .attr("d", line)
        .attr("stroke", "black");
}

function toggleLine(id) {
    let line = d3.select("#" + id);
    let display = line.style("display");
    line.style("display", display === "none" ? "block" : "none");
}
