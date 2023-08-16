<template>
    <div>
      <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="appno" label="编号" width="200" />
      <el-table-column prop="actno" label="活动编号" width="300" />
      <el-table-column prop="perno" label="申请人编号" width="200" />
      <el-table-column prop="appdata" label="申请时间" width="200" />
      <el-table-column prop="appsta" label="申请状态" :formatter="stateFormat" />
      <el-table-column  label="操作" >
        <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="changeAppsta(scope.row)"
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
      <el-form-item label="申请状态" label-width="50px">
        <el-select v-model="active.appsta" placeholder="请选择">
            <el-option
      key="1"
      label="通过"
      :value="1"
    />
    <el-option
      key="2"
      label="未通过"
      :value="2"
    />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateAppsta">更改</el-button>
        <el-button type="primary" @click="isShow= false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
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