// Set up dimensions and margins[cite: 18]
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;  
const height = 400; 

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Palette colors[cite: 18]
const barColor = "#595b5c";
const bodyBackgroundColor = "#fbf6ec";

// Set up the scales[cite: 18]
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Create a bin generator using d3.bin[cite: 18, 20]
const binGenerator = d3.bin()
  .value(d => d.energyConsumption);

// Screen technology filter options[cite: 24]
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// Screen size filter options (Extension)
const filters_size = [
  { id: "all", label: "All Sizes", isActive: true },
  { id: "24", label: "24\"", isActive: false },
  { id: "32", label: "32\"", isActive: false },
  { id: "55", label: "55\"", isActive: false },
  { id: "65", label: "65\"", isActive: false },
  { id: "98", label: "98\"", isActive: false }
];
// ==================== 散点图与 Tooltip 专属常量 (T06-2) ====================

// 散点图专用的内图表变量（避免与直方图冲突）
let innerChartS;

// Tooltip 尺寸常量
const tooltipWidth = 65;
const tooltipHeight = 32;

// 散点图专用的比例尺与颜色比例尺
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();
