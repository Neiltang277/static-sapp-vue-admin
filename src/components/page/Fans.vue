<template lang="pug">
  div
    h2 全部粉丝
    el-table(:data='userList', style='width: 100%')
      el-table-column(label='用户头像')
        template(slot-scope='scope')
          img.avatar(:src='scope.row.userInfo.avatarUrl')
      el-table-column(label='用户名', prop='userInfo.nickName')
      el-table-column(label='性别')
        template(slot-scope='scope')
          | {{scope.row.userInfo.gender === 1 ? "男" : "女"}}
      el-table-column(label='省份', prop='userInfo.province')
      el-table-column(label='城市', prop='userInfo.city')
      el-table-column(label='猜总次数', prop='actionCount', sortable='')
      el-table-column(label='猜对', prop='actionCorrectCount', sortable='')
      el-table-column(label='猜错', prop='actionMissCount', sortable='')
      el-table-column(label='正确率', prop='actionCorrectPercent', sortable='')

</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  data () {
    return {
      userList: []
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
      this.$api.getUserList(10, 1).then(res => {
        console.log(2)
        this.userList = res.data.content
        for (let idx in this.userList) {
          let item = this.userList[idx]
          item.userInfo = JSON.parse(item.userInfo)
          item.actionCorrectPercent = parseInt(item.actionCorrectCount / item.actionCount * 100) / 100 + '%'
        }
      })
    }
  }

}
</script>

<style>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
