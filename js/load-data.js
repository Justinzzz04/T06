// 从 data 文件夹加载 CSV 文件并转换数据类型[cite: 17, 24]
d3.csv("data/Ex6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
})).then(data => {
  console.log("Loaded TV Data:", data);

  // 调用图表绘制、散点图、筛选器初始化与交互函数[cite: 17, 24]
  drawHistogram(data);
  drawScatterplot(data);
  populateFilters(data);
  populateSizeFilters(data);

  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});

