// 消耗热量分析
export let burnalyse_option = {
  color: ["#F94B4B", "#FFA9A9", "#E6E6E6"],
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 10,
    itemWidth: 10,

    data: [
      {
        name: "日常消耗",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "运动消耗",
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
      // y轴线
      splitLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
      axisTick: {
        show: false,
      },
    },
    // y轴
    // {
    //   name: "降雨量(mm)",
    //   nameLocation: "start",
    //   max: 5,
    //   type: "value",
    //   inverse: true,
    //   axisLine: {
    //     lineStyle: {
    //       color: "#ccc",
    //     },
    //   },
    // },
  ],
  series: [
    {
      name: "日常消耗",
      type: "bar",
      stack: "广告",
      barWidth: 10,
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "运动消耗",
      type: "bar",
      stack: "广告",
      data: [220, 182, 191, 234, 290, 330, 310],
    },

    {
      name: "每日建议量",
      type: "bar",
      barWidth: 10,
      barGap: 0,
      stack: "广告1",
      data: [150, 232, 201, 154, 190, 330, 410],
      // 点击亮色
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: "#E6E6E6",
        },
      },
    },
  ],
};
// 运动心率
var colorList = ["#2B91E2", "#F15A4A", "#FFB415"];
export let burnheart_option = {
  tooltip: {
    show: false,
    trigger: "item",
  },
  series: [
    {
      type: "pie",
      // center:["50%","36%"],
      radius: ["46%", "56%"],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 0,
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
        },
      },
      label: {
        show: true,
        fontSize: 10,
        // formatter: "{d}%(46分)\n 心率",
        formatter: function (params) {
          // console.log(params, "===========params");
          return params.percent + "%(46分)\n" + params.name;
        },
      },
      labelLine: {
        normal: {
          length: 10,
          length2: 10,
          lineStyle: {
            width: 1,
          },
        },
      },
      data: [
        {
          name: "低于心直率",
          value: 1.45,
        },
        {
          name: "持平心直率",
          value: 2.93,
        },
        {
          name: "高于心直率",
          value: 3.15,
        },
      ],
    },
  ],
};
// 运动里程分析
export let sportdistance_option = {
  legend: {
    bottom: 20,
    itemWidth: 10,
    itemHeight: 10,
    icon: "circle",
    data: ["每日运动里程推荐", "运动里程"],
    selectedMode: false,
  },
  grid: {
    left: "1%",
    right: "6%",
    bottom: "20%",
    top: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  yAxis: {
    type: "category",
    data: ["07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  series: [
    {
      name: "运动里程",
      type: "bar",
      data: [1, 3, 3.1, 2.6, 3.5, 5, 4],
      itemStyle: {
        barBorderRadius: [0, 24, 24, 0],
        color: "#FF7545",
      },
    },
    {
      name: "每日运动里程推荐",
      type: "bar",
      barGap: 0,
      data: [2.25, 2.25, 2.25, 2.25, 2.25, 2.25, 2.25],
      itemStyle: {
        barBorderRadius: [0, 24, 24, 0],
        color: "#DDDDDD",
      },
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: "#DDDDDD",
        },
      },
    },
  ],
};
// 运动时长分析
export let sporttime_option = {
  legend: {
    bottom: 20,
    itemWidth: 10,
    itemHeight: 10,
    icon: "circle",
    data: ["每日建议运动时长", "运动时长"],
    selectedMode: false,
  },
  grid: {
    left: "1%",
    right: "6%",
    bottom: "20%",
    top: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  yAxis: {
    type: "category",
    data: ["07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  series: [
    {
      name: "运动时长",
      type: "bar",
      data: [1, 3, 3.1, 2.6, 3.5, 5, 4],
      itemStyle: {
        barBorderRadius: [0, 24, 24, 0],
        color: "#5599FF",
      },
    },
    {
      name: "每日建议运动时长",
      type: "bar",
      barGap: 0,
      data: [2.25, 2.25, 2.25, 2.25, 2.25, 2.25, 2.25],
      itemStyle: {
        barBorderRadius: [0, 24, 24, 0],
        color: "#DDDDDD",
      },
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: "#DDDDDD",
        },
      },
    },
  ],
};
