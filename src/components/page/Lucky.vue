<template lang="pug">
  div
    h2 猜中列表
    el-table(:data='luckyList', style='width: 100%')
      el-table-column(type='expand')
        template(slot-scope='props')
          el-form.demo-table-expand(label-position='left', inline='')
            el-form-item(label='中奖码')
              span {{ props.row.giftId }}
            el-form-item(label='淘宝商品ID')
              span {{ props.row.taoId }}
            el-form-item(label='商品名')
              span {{ props.row.title }}
            el-form-item(label='商品图')
              span {{ props.row.thumb }}
            el-form-item(label='商品价格')
              span {{ props.row.taoPrice }}
            el-form-item(label='猜中价格')
              span {{ props.row.taoToken }}
            el-form-item(label='淘口令')
              span {{ props.row.desc }}
      el-table-column(label='中奖码', prop='giftId')
      el-table-column(label='淘宝商品ID', prop='taoId')
      el-table-column(label='商品名', prop='title')
      el-table-column(label='商品图', prop='thumb')
      el-table-column(label='商品价格', prop='taoPrice')
      el-table-column(label='猜中价格', prop='userPrice')
      el-table-column(label='淘口令', prop='taoToken')

</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  data () {
    return {
      luckyList: []
    }
  },
  created () {
    this.getData()
  },
  filters: {
    formatDate (unformatDate) {
      // console.log(this.$moment(unformatDate).format('l'))
      // console.log(moment(unformatDate))
      return moment(unformatDate).format('llll')
    }
  },
  methods: {
    getData () {
      console.log(1)

      // console.log(this.$moment('2018-03-02T12:20:26.000Z'))
      this.$api.getLuckyList(10, 1).then(res => {
        console.log(2)
        this.luckyList = res.data.content.rows
        console.log(this.luckyList)
      })
    }
  }

}
</script>

<style>

</style>
