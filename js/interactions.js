// Screen Tech Filters
const populateFilters = (data) => {
  d3.select("#filters_screen")
    .selectAll(".filter-tech")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters_screen.forEach(filter => {
          filter.isActive = (filter.id === d.id);
        });

        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === d.id);

        updateHistogram(d.id, data);
      }
    });
};

const updateHistogram = (filterId, data) => {
  const updatedData = (filterId === "all")
    ? data
    : data.filter(tv => tv.screenTech === filterId);

  const updatedBins = binGenerator(updatedData);

  const binsMaxLength = d3.max(updatedBins, d => d.length) || 1;
  yScale.domain([0, binsMaxLength]).nice();

  d3.select("#inner-chart .y-axis")
    .transition()
    .duration(500)
    .call(d3.axisLeft(yScale));

  d3.select("#histogram").select("#inner-chart")
    .selectAll("rect")
    .data(updatedBins)
    .join("rect")
    .transition()
    .duration(500)
    .ease(d3.easeCubicInOut)
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length));
};

// Screen Size Filters (Extension)
const populateSizeFilters = (data) => {
  d3.select("#filters_size")
    .selectAll(".filter-size")
    .data(filters_size)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters_size.forEach(filter => {
          filter.isActive = (filter.id === d.id);
        });

        d3.selectAll("#filters_size .filter")
          .classed("active", filter => filter.id === d.id);

        updateHistogramBySize(d.id, data);
      }
    });
};

const updateHistogramBySize = (sizeId, data) => {
  const updatedData = (sizeId === "all")
    ? data
    : data.filter(tv => tv.screenSize === +sizeId);

  const updatedBins = binGenerator(updatedData);

  const binsMaxLength = d3.max(updatedBins, d => d.length) || 1;
  yScale.domain([0, binsMaxLength]).nice();

  d3.select("#inner-chart .y-axis")
    .transition()
    .duration(500)
    .call(d3.axisLeft(yScale));

  d3.select("#histogram").select("#inner-chart")
    .selectAll("rect")
    .data(updatedBins)
    .join("rect")
    .transition()
    .duration(500)
    .ease(d3.easeCubicInOut)
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length));
};

const createTooltip = () => {
  // 在散点图内图表组中追加 Tooltip 群组
  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // 追加 Tooltip 背景矩形
  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

  // 追加 Tooltip 文本标签
  tooltip.append("text")
    .attr("class", "tooltip text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

const handleMouseEvents = () => {
  // 绑定散点圆圈的鼠标悬停与移开事件
  innerChartS.selectAll("circle")
    .on("mouseenter", (e, d) => {
      console.log("Mouse entered circle", d);

      // 更新提示框文本为当前数据点的屏幕尺寸
      d3.select(".tooltip.text")
        .text(d.screenSize);

      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");

      // 定位并显示 Tooltip
      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", (e, d) => {
      console.log("Mouse left circle", d);

      // 隐藏并移开 Tooltip
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", `translate(0, 500)`);
    });
};