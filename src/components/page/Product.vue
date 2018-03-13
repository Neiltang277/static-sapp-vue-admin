<template lang="pug">
  div
    h2 全部商品
    el-row
      el-button 批量导入
      el-button 下架
      el-button 删除
    el-table(ref='multipleTable', :data='detailList', tooltip-effect='dark', style='width: 100%', @selection-change='handleSelectionChange')
      el-table-column(type='selection', width='55')
      //- el-table-column(label='日期', width='120')
      el-table-column(prop='title', label='商品名称')
      el-table-column(prop='taoId', label='淘宝ID', width='120')
      el-table-column(prop='price', label='售价', width='120')
      el-table-column(label='主图', width='120')
        template(slot-scope='scope')
          img.mainpic(:src='scope.row.thumb')
          //- {{ scope.row.date }}
      el-table-column(prop='taoToken', label='淘口令(30天有效)', width='200')
      el-table-column(prop='bonus', label='佣金', width='120')
    //- div(style='margin-top: 20px')
    //-   el-button(@click='toggleSelection([tableData3[1], tableData3[2]])') 切换第二、第三行的选中状态
    //-   el-button(@click='toggleSelection()') 取消选择

</template>

<script>
export default {
  data () {
    return {
      multipleSelection: [],
      detailList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      console.log(1)
      this.$api.getDetailList(10, 1).then(res => {
        console.log(2)
        this.detailList = res.data.content.rows
        console.log(this.detailList)
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }

}
</script>

<style scoped>
.mainpic {
  width: 50px;
  height: 50px;
}
</style>
