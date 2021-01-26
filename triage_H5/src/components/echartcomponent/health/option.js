// 摄入热量分析
export let hotanalyse_option = {
  color: ["#A6CE3A", "#01B39E", "#0199CA", "#58BB71", "#E6E6E6"],
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 10,
    itemWidth: 10,
    data: [
      {
        name: "早餐",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "中餐",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "晚餐",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "加餐",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "每日建议量",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
    ],
    textStyle: {
      color: "rgba(0,0,0,.3)",
      fontSize: 10,
      fontWeight: 300,
      padding: [0, 2],
    },
    tooltip: {
      show: true,
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "6%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    offset: 10,
    data: ["07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
      show: false,
    },
    //  改变x轴字体颜色和大小
    axisLabel: {
      interval: 0,
      textStyle: {
        color: "#999999",
        fontSize: "10",
      },
    },
    //网格样式
    splitLine: {
      show: false,
      interval: "auto",
      lineStyle: {
        color: ["#ccc"],
        width: 1,
        type: "solid",
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: [
    {
      type: "value",
      // name: "mmHg",
      // 分布内容颜色
      splitArea: {
        show: false,
      },

      minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
      // y轴颜色
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
      //  改变y轴字体颜色和大小
      axisLabel: {
        formatter: "{value}", //  给y轴添加单位
        textStyle: {
          color: "#ccc",
          fontSize: "12",
        },
      },
      // y轴线分布线
      splitLine: {
        lineStyle: {
          color: "#ccc",
        },
        // show: false,
      },
      axisTick: {
        show: false,
      },
    },
    {
      name: "降雨量(mm)",
      nameLocation: "start",
      max: 5,
      type: "value",
      inverse: true,
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "早餐",
      type: "bar",
      stack: "广告",
      barWidth: 10,
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "中餐",
      type: "bar",
      stack: "广告",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "晚餐",
      type: "bar",
      stack: "广告",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "加餐",
      type: "bar",
      stack: "广告",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "每日建议量",
      type: "bar",
      barWidth: 10,
      barGap: 0,
      stack: "每日建议量",
      data: [150, 232, 201, 154, 190, 330, 410],
      // 高亮点击
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: "#E6E6E6",
        },
      },
    },
  ],
};
// 营养素分析
export let heatanalyse_option = {
  title: [
    {
      text: "建议",
      x: "44%",
      y: 0,
      textAlign: "center",
      textStyle: {
        align: "center",
        color: "#6BB2EB",
        fontSize: 12,
        fontWeight: "100",
      },
    },
    {
      text: "实际",
      x: "44%",
      y: 20,
      textAlign: "center",
      textStyle: {
        align: "center",
        color: "#F05A49",
        fontSize: 12,
        fontWeight: "100",
      },
    },
    {
      text: "营养素分析",
      left: "50%",
      top: "42%",
      textAlign: "center",
      textStyle: {
        fontSize: "14",
        color: "#B6B6B6",
        textAlign: "center",
        fontWeight: "100",
      },
    },
  ],
  series: [
    {
      name: "访问来源",
      type: "pie",
      startAngle: 85,
      radius: ["82%", "92%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: Math.round(0.1 * 75),
          itemStyle: {
            normal: {
              color: "#F05A49",
            },
          },
        },

        {
          value: 75 - Math.round(0.2 * 75),
          name: " ",
          itemStyle: {
            normal: {
              color: "#2B91E1", //未完成的圆环的颜色
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          value: 75 - Math.round(0.7 * 75),
          name: " ",
          itemStyle: {
            normal: {
              color: "#29AB91", //未完成的圆环的颜色
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          value: 25,
          name: " ",
          itemStyle: {
            normal: {
              color: "transparent", //未完成的圆环的颜色
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
      ],
    },
    {
      name: "访问来源1",
      type: "pie",
      startAngle: 85,
      radius: ["62%", "72%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },

      data: [
        {
          value: Math.round(0.1 * 75),
          itemStyle: {
            normal: {
              color: "#F05A49",
            },
          },
        },

        {
          value: 75 - Math.round(0.2 * 75),
          name: " ",
          itemStyle: {
            normal: {
              color: "#2B91E1", //未完成的圆环的颜色
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          value: 75 - Math.round(0.7 * 75),
          name: " ",
          itemStyle: {
            normal: {
              color: "#29AB91", //未完成的圆环的颜色
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          value: 25,
          name: " ",
          itemStyle: {
            normal: {
              color: "transparent", //未完成的圆环的颜色
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
      ],
    },
  ],
};
