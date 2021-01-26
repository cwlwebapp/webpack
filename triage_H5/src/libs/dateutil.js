import dayjs from "dayjs";
import store from "../store";
// import bus from "../libs/bus";

const dateutil = {};

/**
 格式化时间
 @param date
 @param format
    YY 18 Two-digit year
    YYYY 2018 Four-digit year
    M 1-12 The month, beginning at 1
    MM 01-12 The month, 2-digits
    MMM Jan-Dec The abbreviated month name
    MMMM January-December The full month name
    D 1-31 The day of the month
    DD 01-31 The day of the month, 2-digits
    d 0-6 The day of the week, with Sunday as 0
    dd Su-Sa The min name of the day of the week
    ddd Sun-Sat The short name of the day of the week
    dddd Sunday-Saturday The name of the day of the week
    H 0-23 The hour
    HH 00-23 The hour, 2-digits
    h 1-12 The hour, 12-hour clock
    hh 01-12 The hour, 12-hour clock, 2-digits
    m 0-59 The minute
    mm 00-59 The minute, 2-digits
    s 0-59 The second
    ss 00-59 The second, 2-digits
    SSS 000-999 The millisecond, 3-digits
    Z +05:00 The offset from UTC
    ZZ +0500 The offset from UTC, 2-digits
    A AM PM
    a am pm
 @return String
 */
dateutil.formatDate = function (date, format) {
  format = format || "YYYY-MM-DD HH:mm:ss";
  return dayjs(date).format(format);
};

/**
 比较date与当前时间的差
 @param date
 @param unit
    date D Date of Month
    day d Day of Week (Sunday as 0, Saturday as 6)
    week w Week of Year
    quarter Q Quarter
    month M Month (January as 0, December as 11)
    year y Year
    hour h Hour
    minute m Minute
    second s Second
    millisecond ms Millisecond
 @return Integer
 */
dateutil.diffNow = function (date, unit) {
  return dayjs().diff(dayjs(date), unit);
};

dateutil.diff = function (date1, date2, unit) {
  return dayjs(date1).diff(date2, unit);
};

/**
 获取unix timestamp
 @param date
 @return Integer
 */
dateutil.valueOf = function (date) {
  return dayjs(date).valueOf();
};

dateutil.add = function (date, amount, unit) {
  return dayjs(date).add(amount, unit).toDate();
};

dateutil.subtract = function (date, amount, unit) {
  return dayjs(date).subtract(amount, unit).toDate();
};
dateutil.time = function (value) {
  var date = new Date(value * 1);
  // var year = date.getYear();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  return [year, month, day].map(fn).join("-");

  function fn(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
};
dateutil.time1 = function (value) {
  var date = new Date(value * 1);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  return [month, day].map(fn).join("/");

  function fn(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
};

dateutil.timetype = function (value) {
  var date = new Date(value * 1);
  // var year = date.getYear();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  return [year, month, day];

  function fn(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
};

// 当前时间 到当前周
var currentFirstDate = new Date();

function addDate(date, n) {
  date.setDate(date.getDate() + n);
  return date;
}
function timetype(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(fn).join("-");
  function fn(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
}

function starttweek(date) {
  // 时间格式
  var week = date.getDay() - 1;
  date = addDate(date, week * -1);
  currentFirstDate = new Date(date);
  return {
    start: timetype(addDate(date, 0)),
    end: timetype(addDate(date, 6)),
  };
}

dateutil.starttweek = starttweek;
dateutil.nextweek = function (num) {
  return starttweek(addDate(currentFirstDate, num));
};
// x轴日期排列
// x轴数据
function timemouth(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [month, day].map(fn).join("/");
  function fn(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
}
// let xaxis = [""];
// 开始时间
// let weekstart = starttweek(new Date("2020/09/07")).start;
// let weekstart = starttweek(new Date()).start;

// js 事件监听(没有及时更新)
// bus.$on("fromFirst", (info) => {
//   console.log(info, "===");
//   xaxis = [""]
//   weekstart = info || starttweek(new Date()).start;
//   // x轴时间轴
//   for (let i = 0; i < 7; i++) {
//     xaxis.push(
//       timemouth(
//         new Date(new Date(weekstart.replace("-", "/")).getTime() * 1 + i * 24 * 60 * 60 * 1000)
//       )
//     );
//   }
//   dateutil.xaxis = xaxis;
// });

// vuex 数据监听(没有及时更新)
// store.watch((state, getters)=>{
//  return state.timelock
// },(nval,oval)=>{
//   // console.log(nval,oval,'val====123========')
//   xaxis = [""]
//   weekstart = nval || starttweek(new Date()).start;
//   // x轴时间轴
//   for (let i = 0; i < 7; i++) {
//     xaxis.push(
//       timemouth(
//         new Date(new Date(weekstart.replace("-", "/")).getTime() * 1 + i * 24 * 60 * 60 * 1000)
//       )
//     );
//   }
//   store.commit('setxaxis',xaxis)
//   // console.log(store.state,store.state.xaxis,'==================')
//   // dateutil.xaxis = xaxis;

// },{
//   deep: true
// })

// dateutil.xaxis = xaxis;

// x轴数据
dateutil.xaxis = function (weekstart) {
  let xaxis = [""];
  for (let i = 0; i < 7; i++) {
    xaxis.push(
      timemouth(
        new Date(new Date(weekstart.replace("-", "/")).getTime() * 1 + i * 24 * 60 * 60 * 1000)
      )
    );
  }
  return xaxis;
};

dateutil.birthday = function (value) {
  var n = new Date();
  var birthday = new Date(value);
  return (
    n.getFullYear() -
    birthday.getFullYear() -
    (n.getMonth() < birthday.getMonth() ||
    (n.getMonth() == birthday.getMonth() && n.getDate() < birthday.getDate())
      ? 1
      : 0)
  );
};



export default dateutil;
