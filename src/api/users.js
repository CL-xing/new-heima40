// 这个文件专门用于处理与users表相关的业务
// 1.引入axios
import axios from '@/utils/myaxios'

// 2. 实现登陆验证
export const userLogin = (data) =>{
    return axios({
        method:'post',
        url:'/login',
        data
    })
}

export const getUserInfo = (id) =>{
    return axios({
         // 我们当前所请求的api是需要授权的api,所以要根据后台的要求传入用户状态
    // 这个状态需要根据后台的严格要求进行传递
    // 后台要求使用：Authorization做为键,token做为值
    // headers: {
    //   Authorization: localStorage.getItem('heima_40_token')
    // },
        url:`/user/${id}`
    })
}