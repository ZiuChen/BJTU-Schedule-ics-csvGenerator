## 北交大iCalender课表生成

点击访问本脚本的[Github项目](https://github.com/ZiuChen/BJTU-Schedule-ics-csvGenerator)，后续更新将在本页面与Github共同发布。

### 脚本功能：

* 在Win/Android/IOS日历中登录Outlook邮箱导入课表，导入一次，多端同步！
* 一键将课表导出为.ics文件，支持多端同步，与各系统原生日历应用完美结合。
* 一键将课表导出为.csv文件，可以在Excel中编辑。 

### 使用效果：

![](https://gitee.com/ziuc/utool-filebed/raw/master//20210817-022711-0076.jpeg)

### 使用方法：

[北交大iCalender课表生成使用指南](https://www.cnblogs.com/ziuc/articles/15152630.html)

### 注意事项：

每学期第一教学周的第一个周一需要自行指定，点击 "校历" 按钮查看后，到脚本源代码修改变量`startMonday`的值即可。

考虑到疫情影响，课堂在**思源西楼** 与 **逸夫教学楼**的第二节课上下课时间已经做了修改，具体时间以开学时教务处公布时间为准，有能力的可以到源代码中自行修改变量`delayClassroom`的值，当其值为空时，所有日程都将为标准上下课时间。 

目前仅对本科生 "选课课表" 与 "本学期课表" 两个网页做了支持，研究生选课界面尚未测试。

### 后续开发计划：

增加GUI界面、支持在浏览器修改上述属性、自定义日程描述部分格式；

使用过程中如遇到任何问题，欢迎到[脚本主页](https://greasyfork.org/zh-CN/scripts/430918)或[Github](https://github.com/ZiuChen/BJTU-Schedule-ics-csvGenerator)提交建议！
