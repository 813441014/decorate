// compoents/weekCalendar/weekCalendar.js

var util = require("../../utils/time-utils.js")

Component({

  options: {

    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },



  /** * 组件的属性列表 * 用于组件自定义设置 */

  properties: {

    // 弹窗标题

    timeBean: { // 属性名

      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）

      value: ''// 属性初始值（可选），如果未指定则会根据类型选择一个

    },

    selectWeek: {

      type: Number,

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
    weeklist:function(){
      console.log(this.data)
    }

  }

})