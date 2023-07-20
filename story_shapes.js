let svg = d3.select("#story-shapes")
    .attr("width", 700)
    .attr("height", 500);

// Create x and y scales
let xScale = d3.scaleLinear().domain([0, 1]).range([60, 660]);
let yScale = d3.scaleLinear().domain([-1.5, 1.5]).range([460, 60]); // Adjust the y scale

// Line generator
let line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveBasis);  // Makes the line curvy

let storyLabels = {
    "man-in-hole": [
        {x: 0.5, y: -0.5, text: "Falls into Hole"},
        {x: 0.9, y: 0.5, text: "Gets Out of Hole"}
    ],
    "boy-meets-girl": [
        {x: 0.25, y: 1, text: "Boy Meets Girl"},
        {x: 0.5, y: -1, text: "Boy Loses Girl"},
        {x: 0.75, y: 1, text: "Boy Gets Girl Back"}
    ],
    "kafkaesque": [
        {x: 0, y: 0, text: "Life is Normal"},
        {x: 1, y: -1.5, text: "Life is Miserable"}
    ],
    "hamlet": [
        {x: 0.5, y: 0, text: "Hamlet's Crisis"}
    ],
    "cinderella": [
        {x: 0.15, y: -1, text: "Life's Miserable"},
        {x: 0.35, y: 1, text: "Fairy Godmother Appears"},
        {x: 0.5, y: -0.4, text: "Prince Leaves"},
        {x: 0.85, y: 2, text: "Marries Prince"}
    ]
};

// Story shapes data
let storyShapes = {
    "Lman-in-hole": Array.from({length: 100}, (_, i) => ({x: i / 99, y: i < 50 ? -i / 50 : (i - 50) / 50})),
    "Lboy-meets-girl": Array.from({length: 100}, (_, i) => ({x: i / 99, y: i < 25 ? i / 25 : (i < 75 ? 2 - i / 25 : i / 25 - 2)})),
    "Lkafkaesque": Array.from({length: 100}, (_, i) => ({x: i / 99, y: -i / 100})),
    "Lhamlet": Array.from({length: 100}, (_, i) => ({x: i / 99, y: Math.sin(i / 100 * 2 * Math.PI)})),
   
    "Lcinderella": Array.from({length: 100}, (_, i) => {
    if (i < 25) {
        return {x: i / 99, y: -1};  // Start at -1
    } else if (i < 50) {
        return {x: i / 99, y: -1 + 3 * (i - 25) / 25};  // When prince met, go to high (up to 2)
    } else if (i < 75) {
        return {x: i / 99, y: 2 - 2.2 * (i - 50) / 25};  // Go back down to be not -1 but closer to 0 (down to 0.5)
    } else {
        return {x: i / 99, y: -0.2 + 5 * (i - 75) / 25};  // Then really high (up to 5)
    }
})

};

// Draw story shapes with different colors
let colors = ["blue", "red", "green", "purple", "orange"];
let i = 0;
for (let storyType in storyShapes) {
    svg.append("path")
        .datum(storyShapes[storyType])
        .attr("class", "line")
        .attr("id", storyType)
        .attr("d", line)
        .attr("stroke", colors[i])
        .style("display", "none");  // Add this line to initially show the lines

   // Create labels
    for (let j = 0; j < storyLabels[storyType].length; j++) {
        svg.append("text")
            .attr("x", xScale(storyLabels[storyType][j].x))  // Position along the x-axis
            .attr("y", yScale(storyLabels[storyType][j].y))  // Position along the y-axis
            .attr("text-anchor", "middle")
            .attr("id", storyType + "-label-" + j)  // Give each label a unique id
            .text(storyLabels[storyType][j].text)
            .style("display", "none");  // Hide label initially
    }
    
    i++;
}

// Create x and y axes
let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,460)")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(60,0)")
    .call(yAxis);

// Add x and y axis labels
svg.append("text")
    .attr("x", 360)
    .attr("y", 480)  // Adjust the y position of the label
    .text("Beginning to End");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -260)
    .attr("y", 20)
    .text("Misery to Joy");

// Draw the x-axis line
svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(1))
    .attr("y2", yScale(0))
    .attr("stroke", "black");

function toggleLine(id) {
    let line = d3.select("#L" + id);
    let display = line.style("display");
    line.style("display", display === "none" ? "block" : "none");



}



// Add "Beginning" label to the x-axis
svg.append("text")
    .attr("x", xScale(0))  // Position at the start of the x-axis
    .attr("y", yScale(0) + 30)  // Position slightly below the x-axis
    .attr("text-anchor", "start")  // Align to the start of the text
    .text("Beginning");

// Add "End" label to the x-axis
svg.append("text")
    .attr("x", xScale(1) - 65)  // Position slightly inside from the end of the x-axis
    .attr("y", yScale(0) + 30)  // Position slightly below the x-axis
    .attr("text-anchor", "end")  // Align to the end of the text
    .text("End");



