<template lang='pug'>
  div(style='height:100%')
    el-container(style='height:100%')
      el-header
        h2 全部属性
      el-button(type='success', round='', @click='addAttribute') 新增
      el-main
        el-table(ref='multipleTable', :data='results', tooltip-effect='dark', style='width: 100%', @selection-change='handleSelectionChange')
          el-table-column(type='selection', width='55')
          el-table-column(label='属性名', prop='attr')
          el-table-column(label='操作')
            template(slot-scope='scope')
              el-button(size='mini', @click='handleEdit(scope.$index, scope.row)') 编辑
              el-button(size='mini', type='danger', @click='handleDelete(scope.$index, scope.row)') 删除
      el-footer
        el-pagination(@size-change='handleSizeChange', @current-change='handleCurrentChange', :current-page='current', :page-sizes='[10, 20, 30, 40]', :page-size='pageSize', layout='total, sizes, prev, pager, next, jumper', :total='total')
    el-dialog(title='提示', :visible.sync='dialogVisible', width='30%', :before-close='handleClose')
      el-form(ref='form', :model='form', label-width='80px')
        el-form-item(label='属性名')
          el-input(v-model='form.attr')
      span.dialog-footer(slot='footer')
        el-button(@click='dialogVisible = false') 取 消
        el-button(type='primary', @click='onSubmit') 确 定

</template>

<script>
export default {
  data () {
    return {
      results: [],
      pageSize: 10,
      current: 1,
      total: 0,
      dialogVisible: false,
      form: {
        attr: ''
      },
      attrId: '',
      isNew: true,
      platform: 'http://a-daily.qinshou.me'
    }
  },
  created () {
    if (this.$route.query.platform === 'a') {
      this.platform = 'http://a-daily.qinshou.me'
    } else {
      this.platform = 'https://a.qinshou.me'
    }
    this.getAttributeList(this.pageSize, this.current)
  },
  filters: {
    formatDate (unformatDate) {
      return this.$moment(unformatDate).format('llll')
    }
  },
  methods: {
    getAttributeList (pageSize, current) {
      this.$axios.get(this.platform + '/gods/getAttributeList', {
        params: {
          pageSize,
          current,
          debug: 1
        }
      }).then(res => {
        this.results = res.data.content.result
        console.log(res)
        this.total = res.data.content.total
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.current = val
      this.getAttributeList(this.pageSize, this.current)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      this.dialogVisible = true
      this.attrId = row.id
      this.form.attr = row.attr
      this.isNew = false
    },
    handleDelete (index, row) {
      this.$axios.delete(this.platform + '/gods/deleteAttribute', {
        params: {
          debug: 1
        },
        data: {
          id: row.id
        }
      }).then(res => {
        console.log(res)
        this.results.splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'warning'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    addAttribute () {
      this.dialogVisible = true
      this.form.attr = ''
      this.isNew = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit () {
      if (this.isNew) {
        this.$axios.post(this.platform + '/gods/addAttribute', {
          attr: this.form.attr
        }, {
          params: {
            debug: 1
          }
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.dialogVisible = false
          this.getAttributeList(this.pageSize, this.current)
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        })
      } else {
        this.$axios.put(this.platform + '/gods/editAttribute', {
          id: this.attrId,
          attr: this.form.attr
        }, {
          params: {
            debug: 1
          }
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogVisible = false
          this.getAttributeList(this.pageSize, this.current)
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '修改失败'
          })
        })
      }
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
