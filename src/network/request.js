import axios from 'axios'

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL: 'https://view.inews.qq.com',
      timeout: 5000
    })

    //2.axios的拦截器
    instance.interceptors.request.use(config => {

      return config   //拦截以后必须 return 出去
    },err => {
      console.log(err);   //发送不出去就来到这里
    })
    instance.interceptors.response.use(res => {
      console.log(res);   //接收拦截
      return res.data
    },err => {
      console.log(err);
    })

    //3.发送真正的网络请求
    return instance(config)

}
