<template>
     <div class="login">
    <div class="form-cls">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="70px"
        >
          <h2>社团报名系统</h2>
          <el-form-item label="用户名:" prop="pername">
            <el-input v-model="ruleForm.pername" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="密码:" prop="perpas">
            <el-input v-model="ruleForm.perpas" type="password" autocomplete="off"/>
          </el-form-item>

          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          </el-form-item>

        </el-form>

      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,ref,toRefs } from 'vue'

import{ LoginData} from "../type/login"
import type { FormInstance } from 'element-plus'
import { login } from '../request/api'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup () {
      //登录
       const router = useRouter()
       const ruleFormRef = ref<FormInstance>()
       //重置
        //表单输入规则
        const rules ={
            pername: [
        {
          required: true,  //是否必须字段
          message: "请输入用户名",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 2,   // 最小字符书
          max: 5,   // 最大字符数
          message: "用户名长度需要在3-5个字符之间",  // 触发的提示信息
          trigger: "blur"
        }],
            perpas: [
        {
          required: true,  //是否必须字段
          message: "请输入用户名",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 6,   // 最大字符数
          message: "用户名长度需要在3-5个字符之间",  // 触发的提示信息
          trigger: "blur"
        }]
        }
        const data=reactive(new LoginData())
        const submitForm = (formEl: FormInstance | undefined) => {
          if (!formEl) return
          //对标单内容进行验证
          //valid
          formEl.validate((valid) => {
          if (valid) {
            login(data.ruleForm).then((res)=>{
              localStorage.setItem('token',res.data.pername)
              //跳转页面，首页
              router.push('/')
              
            })
          } else {
          console.log('error submit!')
          return false
          }
          })
        }

        

        return {
            ...toRefs(data),
            rules,
            ruleFormRef,
            submitForm,
        }
    }
})
</script>

<style scoped>

  .login{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg.jpg");
  }

  .form-cls{
    padding: 50px;
    width: 400px;
    margin: 0 auto;
    background-color: white;
    position: relative;
    top:200px;
    border-radius: 4px;
  }

  .login-btn{
    width: 48%;
  }

  h2{
    text-align: center;
    margin-bottom: 20px;
  }
</style>
