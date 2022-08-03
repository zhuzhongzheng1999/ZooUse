/*
 * @Description: 
 * @Author: zhuzhongzheng
 * @Date: 2022-08-02 19:28:33
 * @LastEditors: zhuzhongzheng
 * @LastEditTime: 2022-08-03 11:09:21
 */


import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

// 请求配置
interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    // 请求拦截器
    interceptors?: Interceptors<T>
}


// 拦截器
interface Interceptors<T> {
    // 请求拦截
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorErr?: (error: any) => any

    // 响应拦截 
    responseInterceptor?: (res: T) => T
    responseInterceptorErr?: (error: any) => any
}


class Request {
    // 实例
    instance: AxiosInstance;
    // 请求配置
    config: RequestConfig;
    // 实例拦截器
    interceptor?: Interceptors<AxiosResponse>;

    constructor(config: RequestConfig) {
        this.config = config;
        this.interceptor = config.interceptors;
        this.instance = axios.create(config);

        // 拦截器的执行顺序: 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应

        // 配置的实例拦截器
        this.instance.interceptors.request.use(
            this.interceptor?.requestInterceptor,
            this.interceptor?.requestInterceptorErr
        )

        // 全局请求拦截器
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => res,
            (err: any) => err,
        )

        // 配置的实例响应拦截器
        this.instance.interceptors.response.use(
            this.interceptor?.responseInterceptor,
            this.interceptor?.responseInterceptorErr
        )

        // 全局响应拦截器
        // 全局拦截器
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                console.log("全局响应拦截器")
                return res.data
            },
            (err: any) => err,
        )
    }

    request<T>(config: RequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // config.interceptors.requestInterceptor(config)
            // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }
            this.instance
                .request<any, T>(config)
                .then(res => {
                    // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors?.responseInterceptor(res)
                    }
                    resolve(res)
                })
                .catch((err: any) => {
                    reject(err)
                })
        })
    }

}

export { RequestConfig };

export default Request;

