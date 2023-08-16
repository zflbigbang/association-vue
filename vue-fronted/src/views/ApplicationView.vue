<template>
    <div>
      <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="appno" label="编号" width="200" />
      <el-table-column prop="actno" label="活动编号" width="300" />
      <el-table-column prop="perno" label="申请人编号" width="200" />
      <el-table-column prop="appdata" label="申请时间" width="200" />
      <el-table-column prop="appsta" label="申请状态" :formatter="stateFormat" />
      
  </el-table>
 
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent, reactive,  toRefs,onMounted } from 'vue'
import { InitData,type ApplicationInt} from '@/type/application';
import{ getApplicationList, putApplication } from '@/request/api'
export default defineComponent({
    setup () {
        const data=reactive(new InitData())
        onMounted(()=>{
            getApplicationList().then(res=>{
                data.list = res.data
            })
        })
        const stateFormat=(row:any)=> {
                if (row.appsta == 0) {
                    return '申请中'
                } else if(row.appsta == 1){
                    return '通过'
                } else {
                    return '未通过'
                }
            }
        const changeAppsta=(row:ApplicationInt)=>{
            data.active=row
            data.isShow=true

        }
        const updateAppsta=()=>{
            putApplication(data.active)
            data.list.forEach((item,i)=>{
                if(item.appno==data.active.appno){
                    data.list[i]=data.active
                }
            })

            data.isShow=false
        }
        return {stateFormat,...toRefs(data),changeAppsta,updateAppsta}
    }
})
</script>

<style scoped>

</style>