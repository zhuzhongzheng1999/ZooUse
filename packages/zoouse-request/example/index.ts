/*
 * @Description: 
 * @Author: zhuzhongzheng
 * @Date: 2022-08-02 15:41:06
 * @LastEditors: zhuzhongzheng
 * @LastEditTime: 2022-08-03 09:36:49
 */
import Request, { RequestConfig } from '../request';


const request: Request = new Request({
    baseURL: "http://127.0.0.1:4523/mock/1391418",
    interceptors: {
        requestInterceptor(config) {
            console.log("请求拦截器")
            return config;
        },
        responseInterceptor(res) {
            console.log("响应拦截器")
            return res
        },
    }
})


interface ZResponse<T> {
    statusCode: number
    msg: string
    result: T
}


interface ZRequestConfig<T, R> extends RequestConfig<ZResponse<R>> {
    data?: T
}


const zRequest = <D = any, T = any>(config: ZRequestConfig<D, T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<ZResponse<T>>(config)
}


interface ZParams {

}

interface ZData {
    id: string,
    name: string,
}

zRequest<ZParams, ZData[]>({
    url: "/all",
    method: "GET"
}).then(res => {
    console.log("res", res)
    res.result[0].name
}).catch(err => {
    console.log("err", err)
})

