var util = require("../../utils/time-utils.js")
var that = this
Page({
  /**
    * 页面的初始数据
    */
  data: {
    selectWeek: 0, //记录是哪一周 ，0：本周 -1上一周 1下一周
    timeBean: {
      yearMonth: '',
      weekDayList: [{
        week: '',
        day: '',
      }]
    },
    condition:0,
    touchDot: 0, //触摸时的原点
    time: 0, //  时间记录，用于滑动时且时间小于1s则执行左右滑动
    interval: "", // 记录/清理 时间记录
    nth: 0, // 设置活动菜单的index
    nthMax: 5, //活动菜单的最大个数
    tmpFlag: true, // 判断左右华东超出菜单最大值时不再执行滑动事件
    year: 0,
    month: 0,
    yearmonth:'',
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    json: [
      { data: 20181110, part: "0" },
      { data: 20181112, part: "1" },
      { data: 20181113, part: "2" }
    ],
    count:{},
    touchDotY:'',
    touchMoveY:''
  },
  /**
   *  生命周期函数--监听页面加载
   * */
  onLoad: function(options) {
    this.setData({ //界面加载时获得本周
      timeBean: util.getWeekDayList(this.data.selectWeek)
    })
    console.log(this.data.timeBean);
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
   
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
      yearmonth: year + "-"+month
    });
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let objarr = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    console.log(startWeek)
    console.log(dayNums);
    var weekdata = "";
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        weekdata = (startWeek + num % 7 - 1) % 7;
        for (var n = 0; n < 7; n++) {
          objarr = {
            isToday: '' + year + (month + 1) + num,
            dateNum: num,
            weight: 5,
            weekdata: weekdata
          }
        }
        console.log(weekdata);
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
      // dateArr[i] = objarr;
      console.log(obj);
    }
    this.setData({
      dateArr: dateArr
    })
    console.log(this.data.objarr);

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
    console.log(this.data.json);
    for (var i = 0; i < this.data.json.length; i++) {
      for (var j = 0; j < this.data.dateArr.length; j++) {
        if (this.data.json[i].data == this.data.dateArr[j].isToday) {
          var unnh = this.data.json[i].part;
          console.log(unnh);
          this.data.dateArr[j].part = unnh;
          this.setData({
            dateArr: this.data.dateArr
          })
        }
      }
    }
  },
  dayClick: function(index) {
    console.log("点击的号为", this.data.timeBean.weekDayList[index.detail].day)
  },
  touchStart: function(e) {
    console.log(e);
    this.data.touchDot = e.touches[0].pageX; // 获取触摸时的原点
    this.data.touchDotY = e.touches[0].pageY;
    // 使用js计时器记录时间    
    console.log(this.data.time);
    var times = this.data.time;
    this.data.interval = setInterval(function() {
      times++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function(e) {
    console.log(e)
    var touchMove = e.touches[0].pageX;
    var touchMoveY = e.touches[0].pageY;
    console.log("touchMove:" + touchMove + " this.data.touchDot :" + this.data.touchDot + " diff:" + (touchMove - this.data.touchDot));
    // 向上滑动   
    console.log(this.data.tmpFlag);
    console.log(this.data.time);
    if (touchMoveY - this.data.touchDotY <= -40 && this.data.time < 10) {
        // 上滑
      console.log("上滑");
      if (this.data.tmpFlag) {
        if (this.data.condition == 1) {

        }else{
          console.log(this.data.timeBean.yearMonth);
          console.log(this.data.year);
          this.data.condition = 1
          this.setData({
            condition: 1
          })
          
      }
    }
    }
      if (touchMoveY - this.data.touchDotY >= 40 && this.data.time < 10) {
        // 上滑
        console.log("xia滑");
        if (this.data.tmpFlag) {
          if (this.data.condition == 1) {
            this.data.condition = 0
            this.setData({
              condition:0,
              month: this.data.timeBean.yearMonth,
               // year:
          // date
          // dateArr
          // isToday:isToday
          // isTodayWeek
          // todayIndex
          // json
            })
          } else {
            this.data.condition = 1;
            this.setData({
              condition: 1
            })
          }
        }
      }
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10) {
      console.log("左滑成功");
      console.log(this.data.tmpFlag);
      if (this.data.tmpFlag) {
        if (this.data.condition == 1) {
        this.data.tmpFlag = false; //每次移动中且滑动时不超过最大值 只执行一次
        this.setData({
          selectWeek: --this.data.selectWeek,
          timeBean: util.getWeekDayList(this.data.selectWeek--) // -- 是获取上一周的日期列表
        })
       }else{
          this.data.tmpFlag = false; 
          let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
          let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
          this.setData({
            year: year,
            month: (month + 1)
          })
          this.dateInit(year, month);
       }
      }
    }
    // 向下滑动
    console.log(this.data.tmpFlag);
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10) {
      console.log("右滑成功");
      if (this.data.tmpFlag) {
        if (this.data.condition == 1) {
        this.data.tmpFlag = false;
        this.setData({
          selectWeek: ++this.data.selectWeek,
          timeBean: util.getWeekDayList(this.data.selectWeek++) // ++ 是获取下一周的日期列表，看工具类调用
        })
        }else{
          this.data.tmpFlag = false; 
          let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
          let month = this.data.month > 11 ? 0 : this.data.month;
          this.setData({
            year: year,
            month: (month + 1)
          })
          this.dateInit(year, month);
        }
      }
      console.log("jici");
    }
  },
  // 触摸结束事件
  touchEnd: function(e) {
    console.log(e);
    clearInterval(this.data.interval); // 清除setInterval
    this.data.time = 0;
    this.data.tmpFlag = true; // 回复滑动事件   
  }
})