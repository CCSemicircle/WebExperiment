var year; // 年
var month; // 月
var date; // 日
var weekday; // 星期
var hour; // 时
var minute; // 分
var second; // 秒

/**
 * 绘制表盘
 */
function createClock() {
  // 外圈
  let circle = document.getElementById("circle");
  // 内圈
  let smallCircle = document.getElementById("smallCircle");
  let angle = 0;

  // 绘制刻度盘
  for (var i = 0; i < 30; i++) {
    var clockPanel = document.createElement("div");
    clockPanel.setAttribute("class", "clockPanel");
    circle.appendChild(clockPanel);
    circle.insertBefore(clockPanel, smallCircle);
    clockPanel.style.transform = "rotate(" + angle + "deg)";
    angle += 6;
    // 有数字的刻度加粗
    if (i % 5 == 0) {
      clockPanel.style.border = "2px solid black";
    }
  }
}

/**
 * 获取日期
 */
function getDate() {
  let date = new Date();
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDate();
  weekday = date.getDay();
}

/**
 * 获取时间
 */
function getTime() {
  console.log("fresh time");
  let date = new Date();
  hour = date.getHours();
  if (hour > 12) {
    harlDay = true;
  }
  minute = date.getMinutes();
  second = date.getSeconds();
}

/**
 * 初始化时钟、分钟、秒钟的位置
 */
var secondAngle = 6;
var minuteAngle = 6;
var hourAngle = 6;

/**
 * 刷新时间，包括时钟、分钟、秒钟的角度，以及时间的文本显示
 */
function secondPointFresh() {
  second++;
  if (second == 60) {
    second = 0;
    minute++;
    if (minute == 60) {
      minute = 0;
      hour++;
      if (hour == 24) {
        hour = 0;
      }
    }
    // 在每天00:05时刻校验时间，刷新日期
    if (hour == 0 && minute == 5) {
      console.log("Inspection Time");
      // 校验时间
      getTime();
      // 刷新日期
      dateFresh();
    }
  }

  // 刷新时钟、分钟、秒钟的角度
  secondAngle = second * 6;
  let secondPoint = document.getElementById("secondPoint");
  secondPoint.style.transform = "rotate(" + secondAngle + "deg)";
  minuteAngle = minute * 6;
  let minutePoint = document.getElementById("minutePoint");
  minutePoint.style.transform = "rotate(" + minuteAngle + "deg)";
  hourAngle = (hour % 12) * 30 + minute * 0.5;
  let hourPoint = document.getElementById("hourPoint");
  hourPoint.style.transform = "rotate(" + hourAngle + "deg)";

  // 刷新文本显示
  let time = hour + ":" + minute + ":" + second;
  let timeNode = document.getElementById("time");
  timeNode.textContent = time;
}

/**
 * 刷新日期
 */
function dateFresh() {
  console.log("fresh date");
  getDate();
  let weekdayStr = "";
  switch (weekday) {
    case 0: {
      weekdayStr = "星期日";
      break;
    }
    case 1: {
      weekdayStr = "星期一";
      break;
    }
    case 2: {
      weekdayStr = "星期二";
      break;
    }
    case 3: {
      weekdayStr = "星期三";
      break;
    }
    case 4: {
      weekdayStr = "星期四";
      break;
    }
    case 5: {
      weekdayStr = "星期五";
      break;
    }
    case 6: {
      weekdayStr = "星期六";
      break;
    }
    default: {
      console.log("weekday error");
    }
  }
  let date = year + "年" + (month + 1) + "月" + day + "日  " + weekdayStr;
  let dateNode = document.getElementById("date");
  dateNode.textContent = date;
}

createClock();
getTime();
getDate();
secondPointFresh();
dateFresh();
setInterval("secondPointFresh()", 1000);
