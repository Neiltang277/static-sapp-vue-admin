<template lang="pug">
  div
    h2 昨日数据概览
    el-row
      el-col(:span='5', v-for='(o, index) in yesterday', :key='o.i', :offset='index > 0 ? 1 : 0')
        el-card(:body-style="{ padding: '0px' }")
          div(style='padding: 14px;text-align: center')
            p {{o.name}}
            h2 {{o.count}}
            .bottom.clearfix
              span.up(v-if = 'o.today - o.yesterday > 0') △
              span.down(v-else) ▽
              time.time {{ parseInt((o.today - o.yesterday) / o.yesterday * 100)}}
    h2 全部概况
    el-row
      el-col(:span='5', v-for='(o, index) in cards', :key='o.i', :offset='index > 0 ? 1 : 0')
        el-card(:body-style="{ padding: '0px' }")
          div(style='padding: 14px;text-align: center')
            h2 {{o.count}}
            .bottom.clearfix
              time.time {{ o.name }}
    h2 待处理中奖信息
    el-table(:data='luckyList', style='width: 100%',@expand-change='getGiftInfo')
      el-table-column(type='expand')
        template(slot-scope='props')
          el-steps(:active='active', finish-status='success')
            el-step(title='领奖确认')
            el-step(title='商品自购')
            el-step(title='用户签收')
            el-step(title='奖金发送')
            el-step(title='完成')
          div(v-show='props.row.giftStatus=="0"')
            h4 领奖确认检查点：
            ul
              li 检查用户截图是否正常，无PS修改痕迹
              li 检查中奖码是否正确，有效，对应商品状态为猜中待领
              li 查询中奖码对应商品是否正确
          div(v-show='props.row.giftStatus=="1"')
            h4 操作流程：
            ul
              li 把淘口令发送给中奖用户，引导去手机淘宝购买
              li 提醒用户确认收货后再联系客服
              li 确认用户下单并支付后进入下一流程，等待用户签收
          div(v-show='props.row.giftStatus=="2"')
            h4 检查点：
            ul
              li 用户主动联系客服，提供中奖码
              li 用户提供淘宝订单截图，截图显示已完成
              li 在阿里妈妈后台查询到同一笔返佣订单
          div(v-show='props.row.giftStatus=="3"')
            h4 现在，你可以将返现款打给用户
          div(v-show='props.row.giftStatus=="4"')
            h4 该商品已经完成返现，不可再操作
      el-table-column(label='中奖码', prop='giftId')
      el-table-column(label='淘宝商品ID', prop='taoId')
      el-table-column(label='商品名', prop='title')
      el-table-column(label='商品图', prop='thumb')
      el-table-column(label='商品价格', prop='taoPrice')
      el-table-column(label='猜中价格', prop='userPrice')
      el-table-column(label='淘口令', prop='taoToken')

</template>

<script>
export default {
  data: function () {
    return {
      currentDate: new Date(),
      active: 0,
      yesterday: [
        {
          i: 1,
          count: '100',
          yesterday: 120,
          today: 110,
          name: '昨日竞猜次数'
        },
        {
          i: 2,
          count: '1000',
          yesterday: 100,
          today: 110,
          name: '昨日猜中次数'
        },
        {
          i: 3,
          count: '10',
          yesterday: 100,
          today: 110,
          name: '昨日净增新用户'
        }
      ],
      cards: [
        {
          i: 1,
          count: '100',
          name: '商品总数'
        },
        {
          i: 2,
          count: '1000',
          name: '总用户数'
        },
        {
          i: 3,
          count: '10',
          name: '累计猜对奖品'
        },
        {
          i: 4,
          count: '10000',
          name: '预计付出奖金'
        }
      ],
      luckyList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      console.log(1)
      this.$api.getLuckyList(10, 1).then(res => {
        console.log(2)
        this.luckyList = res.data.content.rows
        console.log(this.luckyList)
      })
    },
    getGiftInfo (row, expandedRows) {
      console.log(row.giftId)
      this.$api.getGiftStatus(row.giftId).then(res => {
        row.giftStatus = res.data.content
      })
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.up {
  color: red;
}
.down {
  color: green
}
</style>
