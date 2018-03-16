<template lang='pug'>
  div(style='height:100%')
    el-container(style='height:100%')
      el-header
        h2 全部粉丝
      el-main
        el-row
          el-col(:span='22')
            el-radio-group(v-model='classification',@change='changeRadio')
              el-radio-button(label='question') 问题
              el-radio-button(label='friendSay') 好友留言
              el-radio-button(label='nonsenseImage') 碎碎念配图
              el-radio-button(label='nonsense') 碎碎念
              el-radio-button(label='god') 生成图
              el-radio-button(label='godSay') 生成图配语
          el-col(:span='2')
            el-button(type='success', round='', @click='addGodConfig') 新增
        el-table(ref='multipleTable', :data='results', tooltip-effect='dark', style='width: 100%', @selection-change='handleSelectionChange')
          el-table-column(type='selection', width='55')
          el-table-column(label='图')
            template(slot-scope='scope')
              img(v-if='classification === "nonsenseImage" || classification === "god"',:src='scope.row.title', style='width:50px')
              div(v-else) 无
          el-table-column(label='标题', prop='title')
          el-table-column(label='选项', v-if='classification === "question" || classification === "god"')
            template(slot-scope='scope') {{ scope.row.options || '-' }}
          el-table-column(label='操作')
            template(slot-scope='scope')
              el-button(size='mini', @click='handleEdit(scope.$index, scope.row)') 编辑
              el-button(size='mini', type='danger', @click='handleDelete(scope.$index, scope.row)') 删除
      el-footer
        el-pagination(@size-change='handleSizeChange', @current-change='handleCurrentChange', :current-page='current', :page-sizes='[10, 20, 30, 40]', :page-size='pageSize', layout='total, sizes, prev, pager, next, jumper', :total='total')
    el-dialog(title='提示', :visible.sync='dialogVisible', width='50%', :before-close='handleClose')
      el-form(ref='form', :model='form', label-width='80px')
        el-form-item(label='类型')
          el-select(v-model='form.classification', placeholder='请选择类型', :disabled = '!isNew')
            el-option(label='问题', value='question')
            el-option(label='朋友加料留言', value='friendSay')
            el-option(label='叨叨叨', value='nonsense')
            el-option(label='叨叨叨配图', value='nonsenseImage')
            el-option(label='生成图配语', value='godSay')
            el-option(label='生成图', value='god')
        el-form-item(label='标题(问题)')
          el-input(type='textarea', v-model='form.title')
        el-form-item(label='选项', v-show='form.classification === "question" || form.classification === "god"')
          el-input(type='textarea', :rows = '5', v-model='form.options')
        el-form-item(label='上传图片',  v-show='form.classification === "god" || form.classification === "nonsenseImage"')
          el-upload.upload-demo(drag='', action='http://a-daily.qinshou.me/gods/uploadImage?debug=1', multiple='', :on-success='uploadSuccess')
            i.el-icon-upload
            .el-upload__text
              | 将文件拖到此处，或
              em 点击上传
            .el-upload__tip(slot='tip') 只能上传jpg/png文件，且不超过500kb

        el-form-item(label='备注')
          span(v-if='form.classification === "question"')
            strong 问题: 一句话；
            br
            | 答案：形式 【选项:答案】(冒号为英文冒号)，例如：A:对。 多个选项之间用回车隔开。
          span(v-else-if='form.classification === "nonsense"') 属性名称用【$attr$】代替，后台会自动替换相关属性
          span(v-else-if='form.classification === "god"') 选项内填神创图内属性，以逗号分隔
          span(v-else) 直接填写相关内容
        el-form-item
          el-button(type='primary', @click='onSubmit') 立即创建
          el-button(@click='dialogVisible = false') 取 消

</template>

<script>
export default {
  data () {
    return {
      userList: [],
      classification: 'question',
      classifications: [
        'friendSay',
        'nonsenseImage',
        'nonsense',
        'god',
        'godSay'
      ],
      results: [],
      pageSize: 10,
      current: 1,
      test: {},
      dialogVisible: false,
      options: [],
      form: {
        title: '',
        options: '',
        classification: '',
        notes: ''
      },
      isNew: true,
      godConfigId: '',
      total: 0,
      src: {},
      platform: 'http://a-daily.qinshou.me'
    }
  },
  created () {
    console.log(this.$route.query.platform)
    if (this.$route.query.platform === 'a') {
      this.platform = 'http://a-daily.qinshou.me'
    } else {
      this.platform = 'https://a.qinshou.me'
    }
    this.getGodConfigList(this.pageSize, this.current, this.classification)
  },
  filters: {
    formatDate (unformatDate) {
      // console.log(this.$moment(unformatDate).format('l'))
      // console.log(moment(unformatDate))
      return this.$moment(unformatDate).format('llll')
    }
  },
  methods: {
    getGodConfigList (pageSize, current, classification) {
      this.$axios.get(this.platform + '/gods/getGodConfigList', {
        params: {
          pageSize,
          current,
          classification,
          debug: 1
        }
      }).then(res => {
        this.results = res.data.content.result
        this.total = res.data.content.total
      }).catch(err => {
        console.log(err)
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
    },
    handleEdit (index, row) {
      this.isNew = false
      this.dialogVisible = true
      this.godConfigId = row.id
      this.form = {
        classification: row.classification,
        title: row.title,
        options: row.options,
        notes: row.notes
      }
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$axios.delete(this.platform + '/gods/destroyGodConfig', {
        params: {
          debug: 1
        },
        data: {
          id: row.id,
          classification: this.classification
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
    changeRadio (value) {
      this.pageSize = 10
      this.current = 1
      this.getGodConfigList(this.pageSize, this.current, value)

      console.log(value)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit () {
      console.log(this.form)
      if (this.isNew) {
        let options = this.form.options.replace(new RegExp('\\n', 'gm'), ',')
        this.$axios.post(this.platform + '/gods/addGodConfig', {
          classification: this.form.classification,
          title: this.form.title,
          options: options,
          notes: this.form.notes
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
          this.changeRadio(this.classification)
          this.dialogVisible = false
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        })
      } else {
        this.$axios.put(this.platform + '/gods/editGodConfig', {
          id: this.godConfigId,
          classification: this.classification,
          title: this.form.title,
          options: this.form.options,
          notes: this.form.notes
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
          this.changeRadio(this.classification)
          this.dialogVisible = false
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '修改失败'
          })
        })
      }
      console.log('submit!')
    },
    addGodConfig () {
      this.form = {
        classification: this.classification,
        title: '',
        options: '',
        notes: ''
      }
      this.isNew = true
      this.dialogVisible = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.current = val
      this.getGodConfigList(this.pageSize, this.current, this.classification)
      console.log(`当前页: ${val}`)
    },
    imageuploaded (res) {
      console.log(res)
    },
    uploadSuccess (response, file, fileList) {
      console.log(response.content)
      // console.log(file)
      // console.log(fileList)
      this.form.title = response.content.url
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
