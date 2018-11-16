// compoents/weekCalendar/weekCalendar.js

var util = require("../../utils/time-utils.js")

Component({

  options: {

    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },



  /** * 组件的属性列表 * 用于组件自定义设置 */

  properties: {
    month:{
      type: String, 
      value: ''
    },
    year:{
      type: String, 
      value: ''
    },
    date:{
      type: Object,
      value: ''
    },
    dateArr:{
      type: Object,
      value: ''
    },
    isToday:{
      type: String, 
      value: ''
    },
    isTodayWeek:{
      type: String, 
      value: ''
    },
    todayIndex:{
      type: String, 
      value: ''
    },
    json:{
      type: Object, 
      value: ''
    }

  },
  /**
  
  * 组件的方法列表
  
  * 更新属性和数据的方法与更新页面数据的方法类似
  
  */

  methods: {

    lastWeek: function (e) { //点击了上一周

      this.setData({

        selectWeek: --this.data.selectWeek,

        timeBean: util.getWeekDayList(this.data.selectWeek--) // -- 是获取上一周的日期列表

      })

    },

    nextWeek: function (e) {

      this.setData({

        selectWeek: ++this.data.selectWeek,


        timeBean: util.getWeekDayList(this.data.selectWeek++) // ++ 是获取下一周的日期列表，看工具类调用

      })

    },



    itemClick: function (e) {

      var index = e.currentTarget.dataset.index

      this.triggerEvent("dayClick", index);

    },
    weeklist: function () {
      console.log(this.data)
    }

  }

})