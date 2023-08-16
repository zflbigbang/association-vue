<template>
    <div>

        <el-form :inline="true"  class="demo-form-inline">
    <el-form-item>
      <el-button type="primary" @click="addactivity">报名活动</el-button>
    </el-form-item>
  </el-form>
       
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="actno" label="编号" width="200" />
      <el-table-column prop="assno" label="社团编号" width="200" />
      <el-table-column prop="actname" label="名字" width="200" />
      <el-table-column prop="actdata" label="活动时间" width="300" />
      <el-table-column prop="actsta" label="活动说明"  />
  </el-table>
 

    </div>
    <el-dialog v-model="isShow" title="输入信息">
      <el-form-item label="活动编号" label-width="70px">
        <el-input v-model="active.actno" autocomplete="off" />
      </el-form-item>
      <el-form-item label="申请人编号" label-width="70px">
        <el-input v-model="active.perno" autocomplete="off" />
      </el-form-item>
      <el-form-item label="申请时间" label-width="70px">
       
          
      <el-date-picker
        v-model="active.appdata"
        type="datetime"
        placeholder="Select date and time"
      />
    
      </el-form-item>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="savaApplication">提交</el-button>
        <el-button type="primary" @click="isShow= false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { getActivityList } from '@/request/api'
import { InitData } from '@/type/activity'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import 'element-plus/theme-chalk/index.css' 
import { saveApp } from '@/request/api'
export default defineComponent({
    setup () {
        const data = reactive(new InitData)
        onMounted(()=>{
            getActivityList().then(res=>{
                data.list = res.data
            })
        })
        const addactivity =()=> {
          data.isShow=true
        }
        const savaApplication=()=>{
         
        saveApp(data.active)

          data.isShow = false
        }
        return {...toRefs(data),addactivity,savaApplication}
    }
})
</script>

<style scoped>

</style>