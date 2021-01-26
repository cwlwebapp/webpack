Object.defineProperty(Array.prototype, "notempty", {
  value: function () {
    return this.filter((item) => !!item);
  },
});
// 画圆环
// 画圆
function circular(id, obj) {
  let canvas = document.getElementById(id);
  let ctx = canvas.getContext("2d");
  console.log(canvas.offsetWidth, "ooo");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  // 圆心
  var center = {
    x: canvas.offsetWidth / 2,
    y: canvas.offsetHeight / 2,
  };
  // 画外环
  ctx.beginPath();
  ctx.strokeStyle = "#A9B8D5";
  ctx.lineWidth = 6;
  ctx.arc(center.x, center.y, center.x - 24, 0, 2 * Math.PI);
  ctx.stroke();
  // 画内环
  ctx.beginPath();
  ctx.lineCap = "round";
  const grd = ctx.createLinearGradient(0, 0, 2 * center.y, 0);
  grd.addColorStop(0, obj.color);
  grd.addColorStop(1, obj.color);
  ctx.strokeStyle = grd;
  ctx.lineWidth = 8;
  ctx.arc(center.x, center.y, center.x - 24, 0.75 * Math.PI, 0.75 * Math.PI + 1.5 * Math.PI);
  ctx.stroke();

  //画字
  ctx.beginPath();
  ctx.fillStyle = obj.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (Object.prototype.toString.call(obj.value) == "[object Object]") {
    var metrics1 = ctx.measureText(tofie(obj.value.systolic) + "").width;
    var metrics2 = ctx.measureText(tofie(obj.value.diastolic) + "").width;
    var metrics3 = ctx.measureText(tofie(obj.value.rate) + "").width;
    ctx.font = "normal bold 12px sans-serif";
    ctx.fillText(tofie(obj.value.systolic), 0.6 * center.x, 0.7 * center.y);
    ctx.fillText(tofie(obj.value.diastolic), 1.2 * center.x, 0.7 * center.y);
    ctx.fillText(tofie(obj.value.rate), 0.9 * center.x, 1.1 * center.y);
  } else {
    ctx.font = "normal bold 33px sans-serif";
    var metrics = ctx.measureText(tofie(obj.value) + "").width;
    ctx.fillText(tofie(obj.value, obj.type), center.x - 0.15 * metrics, center.y);
  }

  // 单位
  ctx.beginPath();
  ctx.fillStyle = "#9C9C9C";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  if (Object.prototype.toString.call(obj.value) == "[object Object]") {
    ctx.font = "normal normal 8px sans-serif";
    var me1 = ctx.measureText(obj.unit + "").width;
    var me2 = ctx.measureText("搏/分").width;
    ctx.fillText(obj.unit, 0.6 * center.x + 0.7 * me1 + 0.5 * metrics1, 0.7 * center.y);
    ctx.fillText(obj.unit, 1.2 * center.x + 0.7 * me1 + 0.5 * metrics2, 0.7 * center.y);
    ctx.fillText("搏/分", 0.9 * center.x + 0.7 * me2 + 0.5 * metrics3, 1.1 * center.y);
  } else {
    ctx.font = "normal normal 10px sans-serif";
    var me = ctx.measureText(obj.unit + "").width;
    ctx.fillText(obj.unit, center.x + 0.5 * me + 0.5 * metrics, center.y);
  }

  // 小标题
  if (Object.prototype.toString.call(obj.value) == "[object Object]") {
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.textAlign = "middle";
    ctx.textBaseline = "top";
    ctx.font = "normal normal 10px sans-serif";
    ctx.fillText("脉搏", 0.9 * center.x + 0.35 * me1 + 0.25 * metrics3, 1.1 * center.y + 10);
    ctx.fillText("高压", 0.6 * center.x + 0.35 * me2 + 0.25 * metrics1, 0.7 * center.y + 10);
    ctx.fillText("低压", 1.2 * center.x + 0.35 * me2 + 0.25 * metrics2, 0.7 * center.y + 10);
  }

  // 标题
  ctx.beginPath();
  ctx.fillStyle = "#333333";
  ctx.textAlign = "middle";
  ctx.textBaseline = "top";
  ctx.font = "normal normal 14px sans-serif";
  if (Object.prototype.toString.call(obj.value) == "[object Object]") {
    ctx.fillText(obj.title, center.x, center.y + 40);
  } else {
    ctx.fillText(obj.title, center.x, center.y + 30);
  }
}
// 保留数据位数
function tofie(value, type) {
  if (!!value) {
    let str = value.toString();
    let index = str && str.indexOf(".");
    if (type == "glu") {
      return Number(value).toFixed(1);
    }
    if (index != -1) {
      let leng = str.slice(index);
      if (leng.length > 2) {
        if (type == "uricAcid") {
          return Number(value).toFixed(0);
        } else if (type == "cholesterol") {
          return Number(value).toFixed(1);
        } else {
          return Number(value).toFixed(2);
        }
      } else {
        return Number(value);
      }
    } else {
      return value;
    }
  } else {
    return value;
  }
}
//类型判断
function health(type, value,value1) {
  var obj = {};
  if (type == "cholesterol") {
    if (!!value) {
      obj = {
        0: "总胆固醇偏低",
        1: "总胆固醇正常",
        2: "总胆固醇偏高",
        3: "总胆固醇严重偏高",
      };
      return obj["" + value];
    } else {
      return "总胆固醇";
    }
  } else if (type == "2") {
    if (value == 0 || value == 1) {
      obj = {
        0: "尿检正常",
        1: "尿检异常",
      };
      return obj["" + value];
    } else {
      return "尿检";
    }
  } else if (type == "uricAcid") {
    if (!!value) {
      obj = {
        "-1": "血尿酸严重过低",
        0: "血尿酸偏低",
        1: "血尿酸正常",
        2: "血尿酸偏高",
        3: "血尿酸严重偏高",
      };
      return obj["" + value];
    } else {
      return "血尿酸";
    }
  } else if (type == "temperature") {
    if (!!value) {
      obj = {
        0: "体温偏低",
        1: "体温正常",
        2: "低烧",
        3: "高烧",
      };
      return obj["" + value];
    } else {
      return "体温";
    }
  } else if (type == "bloodpressure") {
    if (!!value) {
      obj = {
        "-1": "血压严重过低",
        0: "低血压",
        1: "正常血压",
        2: "正常高值",
        3: "1级轻度高血压",
        4: "2级中度高血压",
        5: "3级严重高血压",
      };
      return obj["" + value];
    } else {
      return "血压";
    }
  } else if (type == "glu") {
    if (!!value) {
      obj = {
        "-1": "血糖严重过低",
        0: "血糖偏低",
        1: "血糖正常",
        2: "轻度偏高",
        3: "血糖偏高",
        4: "血糖严重超高",
      };
      return obj["" + value];
    } else {
      return "血糖";
    }
  } else if (type == "waistline") {
    if (!!value) {
      obj = {
        1: "正常",
        2: "腹型肥胖",
      };
      return obj["" + value];
    } else {
      return "腰围";
    }
  } else if (type == "weight") {
    if (!!value) {
      console.log(value,value1,'======value')
      // obj = {
      //   0: "偏轻",
      //   1: "正常",
      //   2: "偏高",
      //   3: "超高",
      // };
      // return obj["" + value];
      return 'BIM'+' '+(value/(Math.pow(value1*0.01,2))).toFixed(1)
    } else {
      return "体重";
    }
  }else {
    return "未知状态";
  }
}
// 单位
function unit(type, value) {
  if (type == "cholesterol") {
    if (!!value) {
      return "mmol/L";
    } else {
      return "未知";
    }
  } else if (type == "2") {
    if (value == 0 || value == 1) {
      return "分";
    } else {
      return "未知";
    }
  } else if (type == "uricAcid") {
    if (!!value) {
      return "umol/L";
    } else {
      return "未知";
    }
  } else if (type == "temperature") {
    if (!!value) {
      return "℃";
    } else {
      return "未知";
    }
  } else if (type == "bloodpressure") {
    if (!!value) {
      return "mmHg";
    } else {
      return "未知";
    }
  } else if (type == "glu") {
    if (!!value) {
      return "mmol/L";
    } else {
      return "未知";
    }
  } else if (type == "waistline") {
    if (!!value) {
      return "cm";
    } else {
      return "未知";
    }
  } else if (type == "weight") {
    if (!!value) {
      return "kg";
    } else {
      return "未知";
    }
  } else {
    return "xxx";
  }
}
// 颜色
function color(type, value) {
  var obj = {};
  if (type == "cholesterol") {
    if (!!value) {
      obj = {
        0: "#00BFBF",
        1: "#87CD41",
        2: "#FDD600",
        3: "#EB6100",
      };
      return obj["" + value];
    } else {
      return "#000";
    }
  } else if (type == "2") {
    if (value == 0 || value == 1) {
      obj = {
        0: "#87CD41",
        1: "#FE9011",
      };
      return obj["" + value];
    } else {
      return "未知";
    }
  } else if (type == "uricAcid") {
    if (!!value) {
      obj = {
        "-1": "#5CCBFA",
        0: "#00BFBF",
        1: "#87CD41",
        2: "#FDD600",
        3: "#EB6100",
      };
      return obj["" + value];
    } else {
      return "未知";
    }
  } else if (type == "temperature") {
    if (!!value) {
      obj = {
        0: "#00BFBF",
        1: "#87CD41",
        2: "#FDD600",
        3: "#EB6100",
      };
      return obj["" + value];
    } else {
      return "未知";
    }
  } else if (type == "bloodpressure") {
    if (!!value) {
      obj = {
        "-1": "#5CCBFA",
        0: "#00BFBF",
        1: "#87CD41",
        2: "#FDD600",
        3: "#FE9011",
        4: "#EB6100",
        5: "#E22323",
      };
      return obj["" + value];
    } else {
      return "未知";
    }
  } else if (type == "glu") {
    if (!!value) {
      obj = {
        "-1": "#5CCBFA",
        0: "#00BFBF",
        1: "#87CD41",
        2: "#FDD600",
        3: "#FE9011",
        4: "#EB6100",
      };
      return obj["" + value];
    } else {
      return "未知";
    }
  } else if (type == "waistline") {
    if (!!value) {
      obj = {
        1: "#87CD41",
        2: "#FE9011",
      };
      return obj["" + value];
    } else {
      return "腰围";
    }
  } else if (type == "weight") {
    if (!!value) {
      obj = {
        0: "#00BFBF",
        1: "#87CD41",
        2: "#FDD600",
        3: "#EB6100",
      };
      return obj["" + value];
    } else {
      return "体重";
    }
  } else {
    return "未知状态";
  }
}

module.exports = {
  circular,
  health,
  unit,
  color,
};
