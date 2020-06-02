import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUserName } from "./app";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

const service = axios.create({
  baseURL: BASEURL, //   http://192.168.2.121:8087/devApi=== http://192.168.2.121:8087/productapi
  timeout: 15000
});


/**
 * 请求接口前，做数据处理（请求拦截器）
 */
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //Tokey
    //userId
    //sui
    config.headers['Tokey'] = getToken();
    config.headers['userName'] = getUserName();
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
    // 对响应数据做点什么
    // console.log(response);
    let data = response.data;
    if (data.resCode != 0) {
      Message.error(data.message);
      return Promise.reject(data);//返回后调用catch
    } else {
      return response;
      //return Promise.resolve;//返回后调用then
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

console.log(process.env.VUE_APP_NAME);
export default service;

/**
 * 使用export default时，导入文件import不需要使用花括号
 */
