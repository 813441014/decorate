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
    tmpFlag: true // 判断左右华东超出菜单最大值时不再执行滑动事件
  },
  /**
   *  生命周期函数--监听页面加载
   * */
  onLoad: function(options) {
    this.setData({ //界面加载时获得本周
      timeBean: util.getWeekDayList(this.data.selectWeek)
    })
    console.log(this.data.timeBean)
  },
  dayClick: function(index) {
    console.log("点击的号为", this.data.timeBean.weekDayList[index.detail].day)
  },
  touchStart: function(e) {
    console.log(e);
    this.data.touchDot = e.touches[0].pageY; // 获取触摸时的原点
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
    var touchMove = e.touches[0].pageY;
    console.log("touchMove:" + touchMove + " this.data.touchDot :" + this.data.touchDot + " diff:" + (touchMove - this.data.touchDot));
    // 向上滑动   
    console.log(this.data.tmpFlag);
    console.log(this.data.time);
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10) {
      console.log("上滑成功");
      console.log(this.data.tmpFlag);
      if (this.data.tmpFlag) {
        this.data.tmpFlag = false; //每次移动中且滑动时不超过最大值 只执行一次
        this.setData({
          selectWeek: --this.data.selectWeek,
          timeBean: util.getWeekDayList(this.data.selectWeek--) // -- 是获取上一周的日期列表
        })
      }
    }
    // 向下滑动
    console.log(this.data.tmpFlag);
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10) {
      console.log("下滑成功");
      if (this.data.tmpFlag) {
        this.data.tmpFlag = false;
        this.setData({
          selectWeek: ++this.data.selectWeek,
          timeBean: util.getWeekDayList(this.data.selectWeek++) // ++ 是获取下一周的日期列表，看工具类调用
        })
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