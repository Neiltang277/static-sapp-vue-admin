<template lang="pug">
  .login-wrap
    .ms-title v客后台管理系统
    .ms-login
      el-form.demo-ruleForm(:model='ruleForm', :rules='rules', ref='ruleForm', label-width='0px')
        el-form-item(prop='username')
          el-input(v-model='ruleForm.username', placeholder='email')
        el-form-item(prop='password')
          el-input(type='password', placeholder='password', v-model='ruleForm.password', @keyup.enter.native="submitForm('ruleForm')")
        .login-btn
          el-button(type='primary', @click="submitForm('ruleForm')") 登录
</template>
<script>
export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      self.$refs[formName].validate(valid => {
        if (valid) {
          localStorage.setItem('ms_username', self.ruleForm.username)
          self.$router.push('/dashboard')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  /* margin-top: -230px; */
  text-align: center;
  font-size: 30px;
  color: black;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: 50px 0 0 -190px;
  /* margin: -150px 0 0 -190px; */
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
