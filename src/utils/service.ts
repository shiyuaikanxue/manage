import axios from "axios";

let axiosUrl = "";
if (process.env.NODE_ENV == "development") {
  axiosUrl = process.env.VUE_APP_API;
} else {
  axiosUrl = process.env.VUE_APP_API;
}
//创建axios实例
const service = axios.create({
  baseURL: axiosUrl,
});
// 请求拦截和响应拦截
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    switch (error.response.status) {
      case 404:
        alert("当前路径错误！");
        break;
      case 500:
        alert("服务器连接失败请稍后再试！！！");
        break;
      default:
        alert("未知错误！！！")
        break;
    }
    return Promise.reject(error);
  }
);

export default service;
