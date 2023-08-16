<template>
    <div>
      <div class="select-box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
    <el-form-item label="名字">
      <el-input v-model="selectData.title" placeholder="请输入关键字"/>
    </el-form-item>
    <el-form-item label="角色">
        <el-select v-model="selectData.mansup" class="m-2" placeholder="Select" size="large">
    <el-option
     key="2"
      label="全部"
      :value= "2"
    />
    <el-option
      key="0"
      label="管理员"
      :value="0"
    />
    <el-option
      key="1"
      label="超级管理员"
      :value="1"
    />
  </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
        </div>
      <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="manno" label="编号" width="200" />
      <el-table-column prop="assno" label="社团编号" width="200" />
      <el-table-column prop="manname" label="名字" width="200" />
      <el-table-column prop="manpho" label="电话号码" width="300" />
      <el-table-column prop="mansup" label="角色" :formatter="stateFormat" width="200"/>
      <el-table-column  label="操作" >
        <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="changeManager(scope.row)"
        >
          编辑
        </el-button>
      </template>
      </el-table-column>
  </el-table>
 
        </div>
    </div>
    
    <el-dialog v-model="isShow" title="编辑信息">
    <el-form :model="active">
      <el-form-item label="社团编号" label-width="70px">
        <el-input v-model="active.assno" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名字" label-width="50px">
        <el-input v-model="active.manname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" label-width="50px">
        <el-input v-model="active.manpho" autocomplete="off" />
      </el-form-item>

      <el-form-item label="角色" label-width="50px">
        <el-select v-model="active.mansup" placeholder="请选择角色">
            <el-option
      key="0"
      label="管理员"
      :value="0"
    />
    <el-option
      key="1"
      label="超级管理员"
      :value="1"
    />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateManager">更改</el-button>
        <el-button type="primary" @click="isShow= false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import {getManagerList,putManager} from '../request/api'
import { InitData,type ListInt } from '@/type/manager';

export default defineComponent({
    setup () {
        const data=reactive(new InitData())
        onMounted(()=>{
            getManager()
        })
        const getManager=()=>{
            getManagerList().then(res=>{
                data.list=res.data
            })
        }
        const stateFormat=(row:any)=> {
                if (row.mansup == 0) {
                    return '管理员'
                } else if(row.mansup == 1){
                    return '超级管理员'
                } 
            }
        const onSubmit=()=>{
          let arr:ListInt[]=[]
          if(data.selectData.title||data.selectData.mansup){
            if(data.selectData.title){
              arr=data.list.filter((value)=>{
                return value.manname.indexOf(data.selectData.title) !== -1
              })
            }
            if(data.selectData.mansup){
              arr=(data.selectData.title? arr : data.list).filter((value)=>{
                return value.mansup === data.selectData.mansup
              })
            }
          }else{
            arr = data.list
          }
          data.list = arr
        };
        watch([()=>data.selectData.title,()=>data.selectData.mansup],()=>{
          if(data.selectData.title=='' || data.selectData.mansup == 2){
            getManager()

          }
        })

        const changeManager=(row:ListInt)=>{
            data.active=row
            data.isShow=true
        }
        const updateManager=()=>{
            putManager(data.active)
            data.list.forEach((item,i)=>{
                if(item.manno==data.active.manno){
                    data.list[i]=data.active
                }
            })

            data.isShow=false
        }
        return {...toRefs(data),stateFormat,onSubmit,changeManager,updateManager}
    }
})
</script>

<style scoped>

</style>