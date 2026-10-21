const drawScatterplot = (data) => {
  // 1. 设置散点图 SVG 区域
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // 2. 创建散点图专用内图表组
  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // 3. 设置 X 和 Y 轴的 Domain 范围
  const xExtent = d3.extent(data, d => d.star);
  const yExtent = d3.extent(data, d => d.screenSize);

  xScaleS
    .domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
    .range([0, innerWidth]);

  yScaleS
    .domain([yExtent[0], yExtent[1]])
    .range([innerHeight, 0])
    .nice();

  // 4. 设置分类颜色比例尺
  colorScale
    .domain(data.map(d => d.screenTech))
    .range(d3.schemeCategory10);

  // 5. 绘制散点圆圈
  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.screenSize))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // 6. 添加底部 X 轴与标签
  const bottomAxis = d3.axisBottom(xScaleS);
  innerChartS.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  svg.append("text")
    .text("Star Rating")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  // 7. 添加左侧 Y 轴与标签
  const leftAxis = d3.axisLeft(yScaleS);
  innerChartS.append("g")
    .call(leftAxis);

  svg.append("text")
    .text("Screen size (inches)")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");

  // 8. 添加右侧图例 (Legend)
  const uniqueTechs = Array.from(new Set(data.map(d => d.screenTech)));
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - 140}, ${margin.top})`);

  uniqueTechs.forEach((tech, i) => {
    const g = legend.append('g').attr('transform', `translate(0, ${i * 22})`);
    g.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', colorScale(tech));
    g.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .text(tech)
      .attr('class', 'axis-label');
  });
};