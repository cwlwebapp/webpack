// 总胆固醇-- 折线图
export let cholesterol_option = {
  cwl: "mmol/L",
  tooltip: {
    trigger: "item",
    formatter: function (param) {
      console.log(param, "param===");
      return `<span>${param.value[1]}${cholesterol_option.cwl}<br>${param.seriesName}<span>`;
    },
  },
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 6,
    itemWidth: 6,
    data: [
      {
        name: "严重\n偏低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "正常",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "偏高",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "严重\n偏高",
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
      padding: [0, 1],
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "4%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    offset: 0,
    data: ["", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],

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
      show: true,
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
  yAxis: {
    type: "value",
    // name: "mmHg",

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
        color: "#999999",
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
  series: [
    {
      name: "偏低",
      type: "scatter",
      data: [[1, 20]],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        //设置折线色颜色
        color: "#0BBFC6",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#0BBFC6",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "正常",
      type: "scatter",
      data: [[5, 60]],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#91D143",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#91D143",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "偏高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#FFD700",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FFD700",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "严重\n偏高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#EC6700",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#EC6700",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
  ],
};
// 高血压-- 竖状图
export let pressure_option = {
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 6,
    itemWidth: 6,
    data: [
      {
        name: "严重\n过低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "低\n血压",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "正常\n血压",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "正常\n高值",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "一级\n血压",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "二级\n血压",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "三级\n血压",
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
      padding: [0, 1],
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "4%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    offset: 0,
    data: ["", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],

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
      show: true,
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
  yAxis: {
    type: "value",
    // name: "mmHg",

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
        color: "#999999",
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
  series: [
    {
      name: "严重\n过低",
      type: "line",
      data: [
        [1, 20],
        [1, 60],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        //设置折线色颜色
        color: "#63CFFA",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#63CFFA",
          // label: { show: true }
        },
      },
    },
    {
      name: "低\n血压",
      type: "line",
      data: [
        [5, 60],
        [5, 80],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#02C4C3",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#02C4C3",
          // label: { show: true }
        },
      },
    },
    {
      name: "正常\n血压",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#91D049",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#91D049",
          // label: { show: true }
        },
      },
    },
    {
      name: "正常\n高值",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#FFD900",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FFD900",
          // label: { show: true }
        },
      },
    },
    {
      name: "一级\n血压",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#FF9615",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FF9615",
          // label: { show: true }
        },
      },
    },
    {
      name: "二级\n血压",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#A30F04",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#A30F04",
          // label: { show: true }
        },
      },
    },
    {
      name: "三级\n血压",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#A30F04",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#A30F04",
          // label: { show: true }
        },
      },
    },
  ],
};
// 血糖-- 散点图
export let glu_option = {
  cwl: "mmol/L",
  tooltip: {
    borderColor: "#f00",
    trigger: "item",
    formatter: function (param) {
      console.log(param, '============== // name: "mmHg",');
      return `<span>${param.value[1]}${glu_option.cwl}<br>${param.seriesName}<span>`;
    },
  },
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 6,
    itemWidth: 6,
    data: [
      {
        name: "严重\n过低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "血糖\n偏低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "血糖\n正常",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "轻度\n偏高",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "血糖\n偏高",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "严重\n过高",
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
      padding: [0, 1],
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "4%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    offset: 0,
    data: ["", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],

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
        show: true,
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
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      type: "scatter",
      name: "严重\n过低",
      data: [
        [1, 20],
        [1, 60],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        //设置折线色颜色
        color: "#66CDFB",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#66CDFB",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "血糖\n偏低",
      type: "scatter",
      data: [
        [5, 60],
        [5, 80],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#01C7BE",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#01C7BE",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "血糖\n正常",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#90D049",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#90D049",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "轻度\n偏高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#FCD70A",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FCD70A",
          // label: { show: true }
        },
      },

      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "血糖\n偏高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#FD961B",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FD961B",
          // label: { show: true }
        },
      },

      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "严重\n过高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#EB6700",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#EB6700",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
  ],
};
// 体温 --点图
export let temperature_option = {
  tooltip: {
    trigger: "item",
    formatter: function (param) {
      return `<span>${param.value[1]}℃<br>${param.seriesName}<span>`;
    },
  },
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 6,
    itemWidth: 6,
    data: [
      {
        name: "偏低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "正常",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "低烧",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "高烧",
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
      padding: [0, 1],
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "4%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    offset: 0,
    data: ["", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],

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
      show: true,
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
  yAxis: {
    type: "value",
    // name: "mmHg",

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
        color: "#999999",
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
  series: [
    {
      name: "偏低",
      type: "scatter",
      dataType: "xx",
      data: [
        [1, 20],
        [1, 60],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        //设置折线色颜色
        color: "#00CABA",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#00CABA",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "正常",
      type: "scatter",
      data: [
        [5, 60],
        [5, 80],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#92D048",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#92D048",
          // label: { show: true }
        },
      },
    },
    {
      name: "低烧",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#FED701",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FED701",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "高烧",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#F16500",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#F16500",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
  ],
};
// 尿酸--- 点图
export let uric_acid_option = {
  cwl: "mmol/L",
  tooltip: {
    trigger: "item",
    formatter: function (param) {
      return `<span>${param.value[1]}${uric_acid_option.cwl}<br>${param.seriesName}<span>`;
    },
  },
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 6,
    itemWidth: 6,
    data: [
      {
        name: "严重\n过低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "尿酸\n偏低",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "尿酸\n正常",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "尿酸\n偏高",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "严重\n偏高",
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
      padding: [0, 1],
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "4%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    offset: 0,
    data: ["", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],

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
      show: true,
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
  yAxis: {
    type: "value",
    // name: "mmHg",

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
        color: "#999999",
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
  series: [
    {
      name: "严重\n过低",
      type: "scatter",
      data: [
        [1, 20],
        [1, 60],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        //设置折线色颜色
        color: "#5DD3F5",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#5DD3F5",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "尿酸\n偏低",
      type: "scatter",
      data: [
        [5, 60],
        [5, 80],
      ],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#00C7CB",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#00C7CB",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "尿酸\n正常",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#90CF48",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#90CF48",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "尿酸\n偏高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#29AB91",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#FBDA01",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "严重\n偏高",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 10,
      showAllSymbol: true,
      lineStyle: {
        color: "#E86902",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#E86902",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
  ],
};
// 尿检
export let niaodaifu_option = {
  cwl: "mmol/L",
  tooltip: {
    trigger: "item",
    formatter: function (param) {
      return `<span>${param.value[1]}${niaodaifu_option.cwl}<br>${param.seriesName}<span>`;
    },
  },
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "10",
    itemHeight: 6,
    itemWidth: 6,
    data: [
      {
        name: "正常",
        icon: "circle",
        textStyle: {
          color: "#666",
        },
      },
      {
        name: "异常",
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
      padding: [0, 1],
    },
  },
  // 内容距离边框
  grid: {
    top: "2%", // 等价于 y: '16%'
    left: "1%",
    right: "4%",
    bottom: "20%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    offset: 0,
    data: ["", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16"],

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
      show: true,
      interval: "auto",
      lineStyle: {
        color: ["#ccc"],
        width: 1,
        type: "solid",
      },
    },
  },
  yAxis: {
    type: "value",
    // name: "mmHg",

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
        color: "#999999",
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
  series: [
    // 展示点
    // {
    //   name: "",
    //   type: "scatter",
    //   data: [[1, 20]],
    //   symbol: "circle",
    //   symbolSize: 10,
    //   showAllSymbol: true,
    //   itemStyle: {
    //     //设置折线折点的颜色,
    //     normal: {
    //       color: "#BDEBFF",
    //       // label: { show: true },
    //     },
    //   },
    // },
    // {
    //   name: "",
    //   type: "scatter",
    //   data: [[2, 60]],
    //   symbol: "circle",
    //   symbolSize: 10,
    //   showAllSymbol: true,
    //   itemStyle: {
    //     //设置折线折点的颜色,
    //     normal: {
    //       color: "#95F204",
    //       // label: { show: true }
    //     },
    //   },
    // },
    // {
    //   name: "",
    //   type: "scatter",
    //   data: [[4, 60]],
    //   symbol: "circle",
    //   symbolSize: 10,
    //   showAllSymbol: true,
    //   itemStyle: {
    //     //设置折线折点的颜色,
    //     normal: {
    //       color: "#95F204",
    //       // label: { show: true }
    //     },
    //   },
    // },
    // {
    //   name: "",
    //   type: "scatter",
    //   data: [[5, 80]],
    //   symbol: "circle",
    //   symbolSize: 10,
    //   showAllSymbol: true,
    //   itemStyle: {
    //     //设置折线折点的颜色,
    //     normal: {
    //       color: "#95F204",
    //       // label: { show: true }
    //     },
    //   },
    // },
    //  展示线
    {
      name: "正常",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 0,
      showAllSymbol: true,
      lineStyle: {
        //设置折线色颜色
        color: "#8BD34C",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#8BD34C",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
    {
      name: "异常",
      type: "scatter",
      data: [],
      symbol: "circle",
      symbolSize: 0,
      showAllSymbol: true,
      lineStyle: {
        color: "#F79713",
      },
      itemStyle: {
        //设置折线折点的颜色,
        normal: {
          color: "#F79713",
          // label: { show: true }
        },
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     position: "bottom",
      //   },
      // },
    },
  ],
};
