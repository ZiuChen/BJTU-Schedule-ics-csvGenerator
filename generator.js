// ==UserScript==
// @name         北交大iCalender课表生成
// @namespace    https://github.com/ZiuChen/BJTU-Schedule-ics-csvGenerator
// @version      1.0
// @description  📁📄导出ics/csv格式的日程文件！ 💻📱支持多端同步！ 📝支持Excel编辑！ 📆📅支持导入各系统原生日历！ 💃🤸‍♂️再也不用截长图！下载乱七八糟的软件！ 只适配了本科生界面，如遇问题欢迎反馈！
// @author       Ziu
// @match        https://aa.bjtu.edu.cn/course_selection/courseselect/stuschedule/*
// @match        https://aa.bjtu.edu.cn/course_selection/courseselecttask/schedule/
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @grant        MIT
// ==/UserScript==

(function () {
    'use strict';
    /*! ics.js */
    var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})}
    var ics=function(e,t){"use strict";{if(!(navigator.userAgent.indexOf("MSIE")>-1&&-1==navigator.userAgent.indexOf("MSIE 10"))){void 0===e&&(e="githubZiuChen"),void 0===t&&(t="Calendar");var r=-1!==navigator.appVersion.indexOf("Win")?"\r\n":"\n",n=[],i=["BEGIN:VCALENDAR","PRODID:"+t,"VERSION:2.0"].join(r),o=r+"END:VCALENDAR",a=["SU","MO","TU","WE","TH","FR","SA"];return{events:function(){return n},calendar:function(){return i+r+n.join(r)+o},addEvent:function(t,i,o,l,u,s){if(void 0===t||void 0===i||void 0===o||void 0===l||void 0===u)return!1;if(s&&!s.rrule){if("YEARLY"!==s.freq&&"MONTHLY"!==s.freq&&"WEEKLY"!==s.freq&&"DAILY"!==s.freq)throw"Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";if(s.until&&isNaN(Date.parse(s.until)))throw"Recurrence rrule 'until' must be a valid date string";if(s.interval&&isNaN(parseInt(s.interval)))throw"Recurrence rrule 'interval' must be an integer";if(s.count&&isNaN(parseInt(s.count)))throw"Recurrence rrule 'count' must be an integer";if(void 0!==s.byday){if("[object Array]"!==Object.prototype.toString.call(s.byday))throw"Recurrence rrule 'byday' must be an array";if(s.byday.length>7)throw"Recurrence rrule 'byday' array must not be longer than the 7 days in a week";s.byday=s.byday.filter(function(e,t){return s.byday.indexOf(e)==t});for(var c in s.byday)if(a.indexOf(s.byday[c])<0)throw"Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'"}}var g=new Date(l),d=new Date(u),f=new Date,S=("0000"+g.getFullYear().toString()).slice(-4),E=("00"+(g.getMonth()+1).toString()).slice(-2),v=("00"+g.getDate().toString()).slice(-2),y=("00"+g.getHours().toString()).slice(-2),A=("00"+g.getMinutes().toString()).slice(-2),T=("00"+g.getSeconds().toString()).slice(-2),b=("0000"+d.getFullYear().toString()).slice(-4),D=("00"+(d.getMonth()+1).toString()).slice(-2),N=("00"+d.getDate().toString()).slice(-2),h=("00"+d.getHours().toString()).slice(-2),I=("00"+d.getMinutes().toString()).slice(-2),R=("00"+d.getMinutes().toString()).slice(-2),M=("0000"+f.getFullYear().toString()).slice(-4),w=("00"+(f.getMonth()+1).toString()).slice(-2),L=("00"+f.getDate().toString()).slice(-2),O=("00"+f.getHours().toString()).slice(-2),p=("00"+f.getMinutes().toString()).slice(-2),Y=("00"+f.getMinutes().toString()).slice(-2),U="",V="";y+A+T+h+I+R!=0&&(U="T"+y+A+T,V="T"+h+I+R);var B,C=S+E+v+U,j=b+D+N+V,m=M+w+L+("T"+O+p+Y);if(s)if(s.rrule)B=s.rrule;else{if(B="rrule:FREQ="+s.freq,s.until){var x=new Date(Date.parse(s.until)).toISOString();B+=";UNTIL="+x.substring(0,x.length-13).replace(/[-]/g,"")+"000000Z"}s.interval&&(B+=";INTERVAL="+s.interval),s.count&&(B+=";COUNT="+s.count),s.byday&&s.byday.length>0&&(B+=";BYDAY="+s.byday.join(","))}(new Date).toISOString();var H=["BEGIN:VEVENT","UID:"+n.length+"@"+e,"CLASS:PUBLIC","DESCRIPTION:"+i,"DTSTAMP;VALUE=DATE-TIME:"+m,"DTSTART;VALUE=DATE-TIME:"+C,"DTEND;VALUE=DATE-TIME:"+j,"LOCATION:"+o,"SUMMARY;LANGUAGE=en-us:"+t,"TRANSP:TRANSPARENT","END:VEVENT"];return B&&H.splice(4,0,B),H=H.join(r),n.push(H),H},download:function(e,t){if(n.length<1)return!1;t=void 0!==t?t:".ics",e=void 0!==e?e:"calendar";var a,l=i+r+n.join(r)+o;if(-1===navigator.userAgent.indexOf("MSIE 10"))a=new Blob([l]);else{var u=new BlobBuilder;u.append(l),a=u.getBlob("text/x-vCalendar;charset="+document.characterSet)}return saveAs(a,e+t),l},build:function(){return!(n.length<1)&&i+r+n.join(r)+o}}}console.log("Unsupported Browser")}};

    function buttonGenerate(){
        if(window.location.href.search('/courseselect/stuschedule/')!=-1){ // 本学期课表
            $(".widget-title").append('&nbsp;<button id="stuScheduleCalenderRedirect" title="点击跳转校历" class="btn btn-white btn-xs">校历</button>');
            $(".widget-title").append('&nbsp;&nbsp;<button id="scheduleIcsGenerate" class="btn btn-white btn-xs">导出为ics文件</button>');
            $(".widget-title").append('&nbsp;&nbsp;<button id="csvGenerate" class="btn btn-white btn-xs">导出为csv文件</button>');
            $('#stuScheduleCalenderRedirect').click(function (){window.open('https://bksy.bjtu.edu.cn/Semester.html')});
            $('#scheduleIcsGenerate').click(function (){icsmain(0)});
            $('#csvGenerate').click(function (){csvmain(0)});
        }
        else if(window.location.href.search('/courseselecttask/schedule/')!=-1){ // 选课课表
            $(".widget-title").append('&nbsp;<button id="scheduleCalenderRedirect" title="点击跳转校历" class="btn btn-white btn-xs">校历</button>')
            $(".widget-title").append('&nbsp;&nbsp;<button id="scheduleIcsGenerate" class="btn btn-white btn-xs">导出为ics文件</button>')
            $(".widget-title").append('&nbsp;&nbsp;<button id="csvGenerate" class="btn btn-white btn-xs">导出为csv文件</button>');
            $('#scheduleCalenderRedirect').click(function (){window.open('https://bksy.bjtu.edu.cn/Semester.html')});
            $('#scheduleIcsGenerate').click(function (){icsmain(1)});
            $('#csvGenerate').click(function (){csvmain(1)});
        }
    }

    // generateWeekTable() @github ygowill
    function generateWeekTable(){
        const startMonday = new Date("2021-09-06"); // 每学期第一个周一的日期
        let weekDateTable = [];
        for (let i = 0; i < 30; i++) { // 生成到30周
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

    function tableTransfer(rowTable, isOrigin){ // 7*7行转列
        let tmpTable = [];
        let columnTable = [];
        for(let i=0;i<7;i++){
            if(isOrigin){
                for(let j=0;j<7;j++){
                    tmpTable.push(rowTable[j]);
                }
            }
            else {
                for(let j=i;j<49;j+=7){
                    tmpTable.push(rowTable[j]);
                }
            }
            columnTable[i] = tmpTable;
            tmpTable = [];
        }
        return columnTable;
    }

    function removeZero(iArr){
        for(let i=0;i<iArr.length;i++){
            iArr[i] = parseInt(iArr[i], 10);
        }
        return iArr;
    }

    function dateStr2Arr(dateStr){
        let dateArr = [];
        if(dateStr){
            if(dateStr.indexOf('-') != -1){ // 第X-Y周
                let indexArr = dateStr.split('-');
                removeZero(indexArr);
                for(let i=indexArr[0];i<indexArr[1]+1;i++){
                    dateArr.push(i);
                }
            }
            else if(dateStr.indexOf(',') != -1){ // 单双周
                dateArr = dateStr.split(', ');
                removeZero(dateArr);
            }
            else dateArr.push(parseInt(dateStr, 10)); // 第X周
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

    function stuScheduleGetTable(isOrigin){
        let courseListTmp = tableTransfer($("tr>td[style!='height:80px;']"), isOrigin);
        let courseList = [];
        let courseTmp = {};
        for(let i=0;i<7;i++){
            for(let j=0;j<7;j++){
                for(let k=0;k<courseListTmp[i][j].querySelectorAll('span[style="color:#000"]').length;k++){
                    courseTmp.weekNum=i+1;
                    courseTmp.courseNum=j+1;
                    if(courseListTmp[i][j].querySelectorAll('span[style="color:#000"]')[k]){
                        courseTmp.name = courseListTmp[i][j].querySelectorAll('span[style="color:#000"]')[k].innerText.split('[本')[0];
                        courseTmp.location = courseListTmp[i][j].querySelectorAll('span[class="text-muted"]')[k].innerText;
                        let dateStr = courseListTmp[i][j].querySelectorAll('div[style="max-width:120px;"]')[k].innerText
                        dateStr = dateStr.substring(dateStr.indexOf('第')+1,dateStr.indexOf('周')); // 预处理
                        courseTmp.initInfo = '第'+dateStr+'周';
                        courseTmp.date = dateStr2Arr(dateStr);
                        courseTmp.teacher = courseListTmp[i][j].querySelectorAll('i')[k].innerText;
                        courseTmp.allInfo = courseTmp.name +' '+ courseTmp.initInfo +' '+ courseTmp.location +' '+ courseTmp.teacher;
                        courseList.push(courseTmp);
                        courseTmp = {};
                    }
                }
            }
        }
        return courseList;
    }

    function scheduleGetTable(isOrigin){
        let courseListTmp = tableTransfer($("tr>td[style!='height:80px;']"), isOrigin);
        let courseList = [];
        let courseTmp = {};
        for(let i=0;i<7;i++){
            for(let j=0;j<7;j++){
                for(let k=0;k<courseListTmp[i][j].querySelectorAll('div[style="max-width:120px;"]').length;k++){
                    courseTmp.weekNum=i+1;
                    courseTmp.courseNum=j+1;
                    if(courseListTmp[i][j].querySelectorAll('span')[k]){
                        courseTmp.name = courseListTmp[i][j].getElementsByTagName('span')[k*3].innerText.split('\n')[1];
                        courseTmp.location = courseListTmp[i][j].querySelectorAll('span[class="text-muted"]')[k].innerText;
                        let dateStr = courseListTmp[i][j].querySelectorAll('div[style="max-width:120px;"]')[k].innerText
                        dateStr = dateStr.substring(dateStr.indexOf('第')+1,dateStr.indexOf('周')); // 预处理
                        courseTmp.initInfo = '第'+dateStr+'周';
                        courseTmp.date = dateStr2Arr(dateStr);
                        courseTmp.teacher = courseListTmp[i][j].querySelectorAll('i')[k].innerText;
                        courseTmp.allInfo = courseTmp.name +' '+ courseTmp.initInfo +' '+ courseTmp.location +' '+ courseTmp.teacher;
                        courseList.push(courseTmp);
                        courseTmp = {};
                    }
                }
            }
        }
        return courseList;
    }

    function timeConstructor(weekTh, weekNum, courseNum, isStamp, isDelay){
        let standardTimeTable = [
            ["08:00", "09:50"],
            ["10:10", "12:00"],
            ["12:10", "14:00"],
            ["14:10", "16:00"],
            ["16:20", "18:10"],
            ["19:00", "20:50"],
            ["21:00", "21:50"],
        ]
        let delayTimeTable = [
            ["08:00", "09:50"],
            ["10:30", "12:20"],
            ["12:10", "14:00"],
            ["14:10", "16:00"],
            ["16:20", "18:10"],
            ["19:00", "20:50"],
            ["21:00", "21:50"],
        ]

        let WeekTable = generateWeekTable();
        let DayTime = new Date(WeekTable[weekTh-1][weekNum-1]);
        let rtnTime = [];
        let startTimeStamp, endTimeStamp;
        let delayClassroom = ['思源西楼','逸夫'];

        for(let item of delayClassroom){
            if(isDelay.search(item)!=-1){
                startTimeStamp = DayTime.setHours(delayTimeTable[courseNum-1][0].split(':')[0], delayTimeTable[courseNum-1][0].split(':')[1]);
                endTimeStamp = DayTime.setHours(delayTimeTable[courseNum-1][1].split(':')[0], delayTimeTable[courseNum-1][1].split(':')[1]);
            }
            else {
                startTimeStamp = DayTime.setHours(standardTimeTable[courseNum-1][0].split(':')[0], standardTimeTable[courseNum-1][0].split(':')[1]);
                endTimeStamp = DayTime.setHours(standardTimeTable[courseNum-1][1].split(':')[0], standardTimeTable[courseNum-1][1].split(':')[1]);
            }
        }

        if(isStamp===1){
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

    function icsConstructor(icsEventList){
        let cal = ics();
        let today = new Date();
        today = today.toLocaleDateString();
        for(let i=0;i<icsEventList.length;i++){
            cal.addEvent(icsEventList[i].name, icsEventList[i].description, icsEventList[i].location, icsEventList[i].startTime, icsEventList[i].endTime);
        }
        cal.download('iCalender - 课表 - '+today);
    }

    function eventConstructor(courseList){
        let icsEvent = {};
        let icsEventList = [];
        for(let i=0;i<courseList.length;i++){
            for(let j=0;j<courseList[i].date.length;j++){
                let timeRst = timeConstructor(courseList[i].date[j], courseList[i].weekNum, courseList[i].courseNum,0,courseList[i].location);
                let timeRstStamp = timeConstructor(courseList[i].date[j], courseList[i].weekNum, courseList[i].courseNum,1,courseList[i].location);
                icsEvent.name = courseList[i].name;
                icsEvent.description = courseList[i].location+' '+courseList[i].initInfo+' 任课教师：'+courseList[i].teacher;
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

    function toExcelFormatter(courseList){
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
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''},
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''},
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''},
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''},
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''},
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''},
            {column1:'',column2:'',column3:'',column4:'',column5:'',column6:'',column7:''}
        ];
        let charArr = ['第一节','第二节','第三节','第四节','第五节','第六节','第七节'];
        let objKeys = Object.keys(jsonData[0]);

        for(let i=0;i<7;i++){
            for(let j=0;j<7;j++){
                let tmpKey = objKeys[j+1];
                jsonData[i].column1 = charArr[i]+' ['+standardTimeTable[i][0]+' - '+standardTimeTable[i][0]+']';
                for(let k=0;k<courseList.length;k++){
                    if(courseList[k].courseNum==i+1&&courseList[k].weekNum==j+1){
                        jsonData[i][tmpKey] = jsonData[i][tmpKey] +'  '+ courseList[k].allInfo;
                    }
                }
            }
        }
        return jsonData;
    }

    // tableToExcel() @csdn hhzzcc_
    function tableToExcel(jsonData){
        let str = `课程|星期,星期一,星期二,星期三,星期四,星期五,星期六,星期日\n`;
        for(let i = 0 ; i < jsonData.length ; i++ ){
            for(let key in jsonData[i]){
                str+=`${jsonData[i][key] + '\t'},`;
            }
            str+='\n';
        }
        const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        const link = document.createElement("a");
        link.href = uri;
        link.download =  "课程表.csv";
        link.click();
    }

    function icsmain(icase){
        let icsEventList;
        if(icase===0){
            icsEventList = eventConstructor(stuScheduleGetTable());
        }
        else if(icase===1){
            icsEventList = eventConstructor(scheduleGetTable());
        }
        icsConstructor(icsEventList);
    }

    function csvmain(icase){
        let jsonData;
        if(icase===0){
            jsonData = toExcelFormatter(stuScheduleGetTable());
        }
        else if(icase===1){
            jsonData = toExcelFormatter(scheduleGetTable());
        }
        tableToExcel(jsonData);
    }

    buttonGenerate();

})();
