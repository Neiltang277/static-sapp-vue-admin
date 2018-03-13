<template lang="pug">
  div
    h2 全部分类
    el-row
      el-button 新增
      el-button 修改
      el-button 删除
    el-table(:data='categoryList', tooltip-effect='dark', style='width: 100%')
      el-table-column(prop='title', label='分类标题')
      el-table-column(prop='createdAt', label='创建时间')
        template(slot-scope='scope')
          p {{ scope.row.createdAt | formatDate }}
      el-table-column(prop='updatedAt', label='修改时间')
        template(slot-scope='scope')
          p {{ scope.row.updatedAt | formatDate }}
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  data () {
    return {
      categoryList: []
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
      this.$api.getCategoryList(10, 1).then(res => {
        console.log(2)
        this.categoryList = res.data.content.rows
        console.log(this.categoryList)
      })
    }
  }

}
</script>

<style>

</style>
