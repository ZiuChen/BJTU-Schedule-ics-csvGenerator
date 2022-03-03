// ==UserScript==
// @name         北交大iCalender课表生成
// @namespace    https://github.com/ZiuChen/BJTU-Schedule-ics-csvGenerator
// @version      1.2
// @description  📁📄导出ics/csv格式的日程文件！ 💻📱支持多端同步！ 📝支持Excel编辑！ 📆📅支持导入各系统原生日历！ 💃🤸‍♂️再也不用截长图！下载乱七八糟的软件！ 只适配了本科生界面，如遇问题欢迎反馈！
// @author       Ziu
// @icon         https://gitee.com/ziuc/utool-filebed/raw/master/20210514-231824-0795.png
// @match        https://aa.bjtu.edu.cn/course_selection/courseselect/stuschedule/*
// @match        https://aa.bjtu.edu.cn/course_selection/courseselecttask/schedule/
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/nwcell/ics.js@dfec67f37a3c267b3f97dd229c9b6a3521222794/demo/ics.deps.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function buttonGenerate() {
    if (window.location.href.search("/courseselect/stuschedule/") != -1) {
      // 本学期课表
      $(".widget-title").append(
        '&nbsp;<button id="stuScheduleCalenderRedirect" title="点击跳转校历" class="btn btn-white btn-xs">校历</button>'
      );
      $(".widget-title").append(
        '&nbsp;&nbsp;<button id="scheduleIcsGenerate" class="btn btn-white btn-xs">导出为ics文件</button>'
      );
      $(".widget-title").append(
        '&nbsp;&nbsp;<button id="csvGenerate" class="btn btn-white btn-xs">导出为csv文件</button>'
      );
      $("#stuScheduleCalenderRedirect").click(function () {
        window.open("https://bksy.bjtu.edu.cn/Semester.html");
      });
      $("#scheduleIcsGenerate").click(function () {
        icsmain(0);
      });
      $("#csvGenerate").click(function () {
        csvmain(0);
      });
    } else if (
      window.location.href.search("/courseselecttask/schedule/") != -1
    ) {
      // 选课课表
      $(".widget-title").append(
        '&nbsp;<button id="scheduleCalenderRedirect" title="点击跳转校历" class="btn btn-white btn-xs">校历</button>'
      );
      $(".widget-title").append(
        '&nbsp;&nbsp;<button id="scheduleIcsGenerate" class="btn btn-white btn-xs">导出为ics文件</button>'
      );
      $(".widget-title").append(
        '&nbsp;&nbsp;<button id="csvGenerate" class="btn btn-white btn-xs">导出为csv文件</button>'
      );
      $("#scheduleCalenderRedirect").click(function () {
        window.open("https://bksy.bjtu.edu.cn/Semester.html");
      });
      $("#scheduleIcsGenerate").click(function () {
        icsmain(1);
      });
      $("#csvGenerate").click(function () {
        csvmain(1);
      });
    }
  }

  // generateWeekTable() @github ygowill
  function generateWeekTable() {
    const startMonday = new Date("2022-02-28"); // 每学期第一个周一的日期
    let weekDateTable = [];
    for (let i = 0; i < 30; i++) {
      // 生成到30周
      let weekArr = [];
      for (let j = 0; j < 7; j++) {
        let tmpDate = new Date(startMonday);
        tmpDate.setDate(tmpDate.getDate() + 7 * i + j);
        weekArr.push(tmpDate);
      }
      weekDateTable.push(weekArr);
    }
    return weekDateTable;
  }

  function tableTransfer(rowTable, isOrigin) {
    // 7*7行转列
    let tmpTable = [];
    let columnTable = [];
    for (let i = 0; i < 7; i++) {
      if (isOrigin) {
        for (let j = 0; j < 7; j++) {
          tmpTable.push(rowTable[j]);
        }
      } else {
        for (let j = i; j < 49; j += 7) {
          tmpTable.push(rowTable[j]);
        }
      }
      columnTable[i] = tmpTable;
      tmpTable = [];
    }
    return columnTable;
  }

  function removeZero(iArr) {
    for (let i = 0; i < iArr.length; i++) {
      iArr[i] = parseInt(iArr[i], 10);
    }
    return iArr;
  }

  function dateStr2Arr(dateStr) {
    let dateArr = [];
    if (dateStr) {
      if (dateStr.indexOf("-") != -1) {
        // 第X-Y周
        let indexArr = dateStr.split("-");
        removeZero(indexArr);
        for (let i = indexArr[0]; i < indexArr[1] + 1; i++) {
          dateArr.push(i);
        }
      } else if (dateStr.indexOf(",") != -1) {
        // 单双周
        dateArr = dateStr.split(", ");
        removeZero(dateArr);
      } else dateArr.push(parseInt(dateStr, 10)); // 第X周
    }
    return dateArr;
  }

  // courseList[x]示例：
  // allInfo: "国际贸易实务模拟 第03-06周思源东楼 SD401卜伟"
  // courseNum: 1
  // date: (4) [3, 4, 5, 6]
  // initInfo: "第03-06周"
  // location: "思源东楼 SD401"
  // name: "国际贸易实务模拟 "
  // teacher: "卜伟"
  // weekNum: 6

  function stuScheduleGetTable(isOrigin) {
    let courseListTmp = tableTransfer(
      $("tr>td[style!='height:80px;']"),
      isOrigin
    );
    let courseList = [];
    let courseTmp = {};
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        for (
          let k = 0;
          k <
          courseListTmp[i][j].querySelectorAll('span[style="color:#000"]')
            .length;
          k++
        ) {
          courseTmp.weekNum = i + 1;
          courseTmp.courseNum = j + 1;
          if (
            courseListTmp[i][j].querySelectorAll('span[style="color:#000"]')[k]
          ) {
            courseTmp.name = courseListTmp[i][j]
              .querySelectorAll('span[style="color:#000"]')
              [k].innerText.split("[本")[0];
            courseTmp.location = courseListTmp[i][j].querySelectorAll(
              'span[class="text-muted"]'
            )[k].innerText;
            let dateStr = courseListTmp[i][j].querySelectorAll(
              'div[style="max-width:120px;"]'
            )[k].innerText;
            dateStr = dateStr.substring(
              dateStr.indexOf("第") + 1,
              dateStr.indexOf("周")
            ); // 预处理
            courseTmp.initInfo = "第" + dateStr + "周";
            courseTmp.date = dateStr2Arr(dateStr);
            courseTmp.teacher =
              courseListTmp[i][j].querySelectorAll("i")[k].innerText;
            courseTmp.allInfo =
              courseTmp.name +
              " " +
              courseTmp.initInfo +
              " " +
              courseTmp.location +
              " " +
              courseTmp.teacher;
            courseList.push(courseTmp);
            courseTmp = {};
          }
        }
      }
    }
    return courseList;
  }

  function scheduleGetTable(isOrigin) {
    let courseListTmp = tableTransfer(
      $("tr>td[style!='height:80px;']"),
      isOrigin
    );
    let courseList = [];
    let courseTmp = {};
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        for (
          let k = 0;
          k <
          courseListTmp[i][j].querySelectorAll('div[style="max-width:120px;"]')
            .length;
          k++
        ) {
          courseTmp.weekNum = i + 1;
          courseTmp.courseNum = j + 1;
          if (courseListTmp[i][j].querySelectorAll("span")[k]) {
            courseTmp.name = courseListTmp[i][j]
              .getElementsByTagName("span")
              [k * 3].innerText.split("\n")[1];
            courseTmp.location = courseListTmp[i][j].querySelectorAll(
              'span[class="text-muted"]'
            )[k].innerText;
            let dateStr = courseListTmp[i][j].querySelectorAll(
              'div[style="max-width:120px;"]'
            )[k].innerText;
            dateStr = dateStr.substring(
              dateStr.indexOf("第") + 1,
              dateStr.indexOf("周")
            ); // 预处理
            courseTmp.initInfo = "第" + dateStr + "周";
            courseTmp.date = dateStr2Arr(dateStr);
            courseTmp.teacher =
              courseListTmp[i][j].querySelectorAll("i")[k].innerText;
            courseTmp.allInfo =
              courseTmp.name +
              " " +
              courseTmp.initInfo +
              " " +
              courseTmp.location +
              " " +
              courseTmp.teacher;
            courseList.push(courseTmp);
            courseTmp = {};
          }
        }
      }
    }
    return courseList;
  }

  function timeConstructor(weekTh, weekNum, courseNum, isStamp, isDelay) {
    let standardTimeTable = [
      ["08:00", "09:50"],
      ["10:10", "12:00"],
      ["12:10", "14:00"],
      ["14:10", "16:00"],
      ["16:20", "18:10"],
      ["19:00", "20:50"],
      ["21:00", "21:50"],
    ];
    let delayTimeTable = [
      ["08:00", "09:50"],
      ["10:30", "12:20"],
      ["12:10", "14:00"],
      ["14:10", "16:00"],
      ["16:20", "18:10"],
      ["19:00", "20:50"],
      ["21:00", "21:50"],
    ];

    let WeekTable = generateWeekTable();
    let DayTime = new Date(WeekTable[weekTh - 1][weekNum - 1]);
    let rtnTime = [];
    let startTimeStamp, endTimeStamp;
    let delayClassroom = ["思源西楼", "逸夫"];

    for (let item of delayClassroom) {
      if (isDelay.search(item) != -1) {
        startTimeStamp = DayTime.setHours(
          delayTimeTable[courseNum - 1][0].split(":")[0],
          delayTimeTable[courseNum - 1][0].split(":")[1]
        );
        endTimeStamp = DayTime.setHours(
          delayTimeTable[courseNum - 1][1].split(":")[0],
          delayTimeTable[courseNum - 1][1].split(":")[1]
        );
      } else {
        startTimeStamp = DayTime.setHours(
          standardTimeTable[courseNum - 1][0].split(":")[0],
          standardTimeTable[courseNum - 1][0].split(":")[1]
        );
        endTimeStamp = DayTime.setHours(
          standardTimeTable[courseNum - 1][1].split(":")[0],
          standardTimeTable[courseNum - 1][1].split(":")[1]
        );
      }
    }

    if (isStamp === 1) {
      rtnTime.push(startTimeStamp);
      rtnTime.push(endTimeStamp);
      return rtnTime;
    }

    let startTime = new Date(startTimeStamp);
    let endTime = new Date(endTimeStamp);
    startTime = startTime.toString();
    endTime = endTime.toString();
    rtnTime.push(startTime);
    rtnTime.push(endTime);
    return rtnTime;
  }

  function icsConstructor(icsEventList) {
    let cal = ics();
    let today = new Date();
    today = today.toLocaleDateString();
    for (let i = 0; i < icsEventList.length; i++) {
      cal.addEvent(
        icsEventList[i].name,
        icsEventList[i].description,
        icsEventList[i].location,
        icsEventList[i].startTime,
        icsEventList[i].endTime
      );
    }
    cal.download("iCalender - 课表 - " + today);
  }

  function eventConstructor(courseList) {
    let icsEvent = {};
    let icsEventList = [];
    for (let i = 0; i < courseList.length; i++) {
      for (let j = 0; j < courseList[i].date.length; j++) {
        let timeRst = timeConstructor(
          courseList[i].date[j],
          courseList[i].weekNum,
          courseList[i].courseNum,
          0,
          courseList[i].location
        );
        let timeRstStamp = timeConstructor(
          courseList[i].date[j],
          courseList[i].weekNum,
          courseList[i].courseNum,
          1,
          courseList[i].location
        );
        icsEvent.name = courseList[i].name;
        icsEvent.description =
          courseList[i].location +
          " " +
          courseList[i].initInfo +
          " 任课教师：" +
          courseList[i].teacher;
        icsEvent.location = courseList[i].location;
        icsEvent.startTime = timeRst[0];
        icsEvent.endTime = timeRst[1];
        icsEvent.startTimeStamp = timeRstStamp[0];
        icsEvent.endTimeStamp = timeRstStamp[1];
        icsEventList.push(icsEvent);
        icsEvent = {};
      }
    }
    return icsEventList;
  }

  function toExcelFormatter(courseList) {
    let standardTimeTable = [
      ["08:00", "09:50"],
      ["10:10", "12:00"],
      ["12:10", "14:00"],
      ["14:10", "16:00"],
      ["16:20", "18:10"],
      ["19:00", "20:50"],
      ["21:00", "21:50"],
    ];
    let jsonData = [
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
      {
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
        column7: "",
      },
    ];
    let charArr = [
      "第一节",
      "第二节",
      "第三节",
      "第四节",
      "第五节",
      "第六节",
      "第七节",
    ];
    let objKeys = Object.keys(jsonData[0]);

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        let tmpKey = objKeys[j + 1];
        jsonData[i].column1 =
          charArr[i] +
          " [" +
          standardTimeTable[i][0] +
          " - " +
          standardTimeTable[i][0] +
          "]";
        for (let k = 0; k < courseList.length; k++) {
          if (
            courseList[k].courseNum == i + 1 &&
            courseList[k].weekNum == j + 1
          ) {
            jsonData[i][tmpKey] =
              jsonData[i][tmpKey] + "  " + courseList[k].allInfo;
          }
        }
      }
    }
    return jsonData;
  }

  // tableToExcel() @csdn hhzzcc_
  function tableToExcel(jsonData) {
    let str = `课程|星期,星期一,星期二,星期三,星期四,星期五,星期六,星期日\n`;
    for (let i = 0; i < jsonData.length; i++) {
      for (let key in jsonData[i]) {
        str += `${jsonData[i][key] + "\t"},`;
      }
      str += "\n";
    }
    const uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
    const link = document.createElement("a");
    link.href = uri;
    link.download = "课程表.csv";
    link.click();
  }

  function icsmain(icase) {
    let icsEventList;
    if (icase === 0) {
      icsEventList = eventConstructor(stuScheduleGetTable());
    } else if (icase === 1) {
      icsEventList = eventConstructor(scheduleGetTable());
    }
    icsConstructor(icsEventList);
  }

  function csvmain(icase) {
    let jsonData;
    if (icase === 0) {
      jsonData = toExcelFormatter(stuScheduleGetTable());
    } else if (icase === 1) {
      jsonData = toExcelFormatter(scheduleGetTable());
    }
    tableToExcel(jsonData);
  }

  buttonGenerate();
})();
