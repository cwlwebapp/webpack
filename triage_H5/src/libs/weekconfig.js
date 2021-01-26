export let config = [
  [
    {
      typeCN: "血压",
      pull_acrive: true,
      component: "bloodpressure",
      calendaricon: false,
      warn: false,
    },
    {
      typeCN: "血糖",
      pull_acrive: true,
      component: "glu",
      calendaricon: false,
      warn: false,
    },
    {
      typeCN: "体温",
      pull_acrive: true,
      component: "temperature",
      calendaricon: false,
      warn: false,
    },
    {
      typeCN: "尿酸",
      pull_acrive: true,
      component: "niaodaifu",
      calendaricon: false,
      warn: false,
    },
    {
      typeCN: "尿检",
      pull_acrive: true,
      component: "uric_acid",
      calendaricon: false,
      warn: false,
    },
    {
      pull_acrive: true,
      component: "cholesterol",
      typeCN: "总胆固醇",
      calendaricon: false,
      warn: false,
    },
  ],
  [
    {
      component: "totalheat",
    },
    {
      component: "hotanalyse",
    },
    {
      component: "heatanalyse",
    },
    {
      name: "星期一",
      pull_acrive: true,
      component: "healthtable",
    },
    {
      name: "星期二",
      pull_acrive: true,
      component: "healthtable",
    },
    {
      name: "星期三",
      pull_acrive: true,
      component: "healthtable",
    },
    {
      name: "星期四",
      pull_acrive: true,
      component: "healthtable",
    },
    {
      name: "星期五",
      pull_acrive: true,
      component: "healthtable",
    },
    {
      name: "星期六",
      pull_acrive: true,
      component: "healthtable",
    },
    {
      name: "星期日",
      pull_acrive: true,
      component: "healthtable",
    },
  ],
  [
    {
      component: "totalburn",
    },
    {
      component: "burnalyse",
    },
    // {
    //   component: "burnheart",
    // },
    {
      component: "sportdistance",
    },
    {
      component: "sporttime",
    },
  ],
];
var uploadedDataURL = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/pointer.png";
// 总数配置问题
export let option = {

  series: [
    {
      startAngle: 200,
      endAngle: -20,
      center: ["50%", "66%"],
      // name: "2020年7月 第4周 -健康指数",
      type: "gauge",
      title: {
        offsetCenter: [0, "52%"],
        fontSize: 14,
        color: "#7A7A7A",
        // lineHeight:28
      },
      radius: "106%",

      splitLine: {
        // 分隔线
        length: 20, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          color: "#fff",
        },
      },
      axisLabel: {
        distance: 2,
        color: "#000",
      },
      axisTick: {
        show: false,
        // 坐标轴小标记
        length: 0, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: "auto",
        },
      },
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          width: 16,
          color: [
            [0.1, "#ED3024"],
            [0.2, "#FF341E"],
            [0.3, "#FF5916"],
            [0.4, "#FF760E"],
            [0.5, "#FF9806"],
            [0.6, "#DCBA04"],
            [0.7, "#5CD21E"],
            [0.8, "#50D420"],
            [0.9, "#0FE12C"],
            [1, "#29C62E"],
          ],
        },
      },
      pointer: {
        show: false,
        length: "100%",
      },
      itemStyle: {
        color: "#f00",
        borderColor: "#ff0",
        borderWidth: 10,
        borderType: "solid",
      },
      detail: {
        formatter: function (parm) {
          return parm;
        },
        offsetCenter: [0, "-10%"],
        fontSize: 38,
        color: "#000",
      },
      data: [
        {
          value: 20,
          name: "2020年7月 第4周 -健康指数",
          label: {
            // align: "bottom",
            // verticalAlign: "bottom",
          },
        },
      ],
    },
    //进度圆环
    {
      name: "Line 1",
      type: "pie",
      center: ["50%", "66%"],
      startAngle: -160,
      // width:200,
      clockWise: true,
      radius: ["114%", "118%"],
      avoidLabelOverlap: true,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "center",
            fontSize: 14,
            padding: [40, 0, 0, 0],
            color: "#7CC609",
          },
          labelLine: {
            show: false,
          },
        },
      },
      hoverAnimation: false,
      data: [
        {
          value: Math.round(0.2 * 61),
          name: "良好",
          itemStyle: {
            normal: {
              color: "#BAD8F6",
            },
          },
        },
        {
          //画中间的图标
          name: "",
          value: 0,
          label: {
            position: "inside",
            backgroundColor: {
              image: uploadedDataURL,
            },

            width: 0,
            height: 0,
            borderRadius: 20,
            padding: 8,
          },
        },

        {
          value: 61 - Math.round(0.2 * 61),
          name: " ",
          itemStyle: {
            normal: {
              color: "#BAD8F6", //未完成的圆环的颜色
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
          value: 39,
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
// 数据工具
export let deleteHtmlTag = function (str) {
  str = str.replace(/<[^>]+>|&[^>]+;/g, "").trim(); //去掉所有的html标签和&nbsp;之类的特殊符合
  return str;
};
// 语音初始初始化
import store from "../store";
import Axios from "axios";
let Base64 = require("js-base64").Base64;
// websocket 初始化
let socket = null,
  wxsData = {
    common: {
      app_id: "",
    },
    business: {
      vcn: "xiaoyan",
      aue: "lame",
      speed: 50,
      sfl: 1,
      tte: "UTF8",
    },
    data: {
      status: 2,
      text: "5L2g5aW9",
    },
  };
// 初始化
export let listeninit = () => {
  if (!!socket) {
    return;
  }
  store.commit("setDataLoading", true);
  Axios.request({
    url: "/ajax/user/wx/xf/authorization",
    method: "get",
  }).then((res) => {
    if (res && res.respBody) {
      // 传输内容
      wxsData.common.app_id = res.respBody.appId;
      // websoket初始化
      socket = new WebSocket(res.respBody.path);
      // 开启
      socket.onopen = () => {};
    } else {
      reject("网络不好,语音初始化失败!");
    }
  });
};

// 音频
export let audio = (au) => {
  //数据处理
  function src(au) {
    let rawLength = au.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = au.charCodeAt(i);
    }
    return URL.createObjectURL(new Blob([uInt8Array], { type: "audio/wav" }));
  }
  let myAuto = document.createElement("audio");
  myAuto.src = src(au);

  return myAuto;
};
// 语音发布

export let socketsend = (str, callback) => {
  store.commit("setDataLoading", true);
  let au2 = "";
  // console.log(this.socket.readyState)  1表示可以通信
  wxsData.data.text = Base64.encode(str);
  if (socket.readyState != 1) {
    // 开启
    console.log(socket.url, "===========s");
    socket = new WebSocket(socket.url);
    socket.onopen = () => {
      socket.send(JSON.stringify(wxsData));
    };
  } else {
    socket.send(JSON.stringify(wxsData));
  }

  socket.onmessage = (res) => {
    if (res && res.data) {
      let data = JSON.parse(res.data);
      if (data.code == 0) {
        au2 += window.atob(data.data.audio);
        if (data.data.status == 2) {
          store.commit("setDataLoading", false);
          socket.close();
          callback(au2);
        }
      }
    }
  };
  socket.onclose = (end) => {
    console.log(end, "--------------end");
  };
  socket.onerror = (err) => {
    console.log(err, "-----------err");
  };
};
