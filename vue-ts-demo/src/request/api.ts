import type { ActiveInt } from "@/type/activity";
import service from ".";
import { type LoginFormInt } from "@/type/login";
import {type ListInt} from "@/type/manager";
import type { ApplicationInt } from "@/type/application";
//登录接口
export function login(data:LoginFormInt){
    return service({
        url:"manager/login",
        method:"post",
        data
    })
   
}
//社团列表接口
export function getAssociationList(){
    return service({
        url:"association/list",
        method:"get"
    })
}
//管理员列表接口
export function getManagerList(){
    return service({
        url:"manager/list",
        method:"get"
    })
}
export function putManager(data:ListInt){
    return service({
        url:"manager/update",
        method:"put",
        data
    })
}
//活动信息接口
export function getActivityList(){
    return service({
        url:"activity/list",
        method:"get"
    })
}

export function saveActivity(data:ActiveInt){
    return service({
        url:"activity",
        method:"post",
        data
    })
}
//申请列表接口
export function getApplicationList(){
    return service({
        url:"application/list",
        method:"get"
    })
}
export function putApplication(data:ApplicationInt){
    return service({
        url:"application/update",
        method:"put",
        data
    })
}