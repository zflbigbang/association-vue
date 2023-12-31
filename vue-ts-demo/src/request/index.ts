import axios from 'axios'

//创建axios实列
const service = axios.create({
    baseURL:"/api",
    timeout:5000,
    headers: {
        "Content-type" : "application/json;charset=utf-8"
    } 
})
//请求拦截
service.interceptors.request.use((config)=>{
    config.headers=config.headers || {}
    if(localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})
//响应拦截
service.interceptors.response.use((res)=>{
    const code:number=res.data.code
    if(code != 1){
        return Promise.reject(res.data)
    }
    return res.data
},(err)=>{
    console.log(err);
})
export default service



