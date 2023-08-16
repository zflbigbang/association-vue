<template>
    <div>
      <div class="select-box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
    <el-form-item label="名字">
      <el-input v-model="selectData.title" placeholder="请输入关键字"/>
    </el-form-item>
    <el-form-item label="详情">
      <el-input v-model="selectData.introduce" placeholder="请输入关键字"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
        </div>
      <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="assno" label="编号" width="300" />
      <el-table-column prop="assname" label="名字" width="300" />
      <el-table-column prop="asssta" label="详情" />
  </el-table>
  <el-pagination @current-change='currentChange' @size-change='sizechange' layout="prev, pager, next" :total="selectData.count*2" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import {getAssociationList} from '../request/api'
import { InitData,  type ListInt } from '@/type/association';

export default defineComponent({
    setup () {
        const data=reactive(new InitData()) 
        onMounted(()=>{
            getAssociation();
           });
        const getAssociation =()=>{
          getAssociationList().then(res=>{
          data.list = res.data
          data.selectData.count = res.data.length
        });
        } 
        const dataList = reactive({
          comList:computed(()=>{
            return data.list.slice((data.selectData.page-1)*data.selectData.pagesize,data.selectData.page*data.selectData.page)
          })
        })
        const currentChange=(page:number)=>{
          data.selectData.page=page
        }
        const sizechange=(pagesize:number)=>{
          data.selectData.pagesize=pagesize
        }
        const onSubmit=()=>{
          let arr:ListInt[]=[]
          if(data.selectData.title||data.selectData.introduce){
            if(data.selectData.title){
              arr=data.list.filter((value)=>{
                return value.assname.indexOf(data.selectData.title) !== -1
              })
            }
            if(data.selectData.introduce){
              arr=arr=(data.selectData.title? arr : data.list).filter((value)=>{
                return value.asssta.indexOf(data.selectData.introduce) !== -1
              })
            }
          }else{
            arr = data.list
          }
          data.selectData.count = arr.length
          data.list = arr
        };
        watch([()=>data.selectData.title,()=>data.selectData.introduce],()=>{
          if(data.selectData.title==''&&data.selectData.introduce==''){
           getAssociation()

          }
        })
    
        return {...toRefs(data),currentChange,sizechange,dataList,onSubmit}
    }
})
</script>

<style scoped>

</style>