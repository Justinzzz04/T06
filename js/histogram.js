const drawHistogram = (data) => {
  // Set the dimensions and margins of the chart area[cite: 19]
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // Create an inner chart group with margins[cite: 19]
  const innerChart = svg.append("g")
    .attr("id", "inner-chart")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Generate the bins[cite: 21]
  const bins = binGenerator(data);
  console.log("Initial Bins:", bins);

  // Define scales[cite: 21]
  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();

  // Draw the bars of the histogram[cite: 22]
  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

  // Add bottom axis[cite: 22]
  const bottomAxis = d3.axisBottom(xScale);
  innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  svg.append("text")
    .text("Labeled Energy Consumption (kWh/year)")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  // Add left axis[cite: 23]
  const leftAxis = d3.axisLeft(yScale);
  innerChart.append("g")
    .attr("class", "y-axis")
    .call(leftAxis);

  svg.append("text")
    .text("Frequency")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");
};