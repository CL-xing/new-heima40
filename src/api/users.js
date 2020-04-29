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