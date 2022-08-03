/*
 * @Description: 
 * @Author: zhuzhongzheng
 * @Date: 2022-08-02 19:28:33
 * @LastEditors: zhuzhongzheng
 * @LastEditTime: 2022-08-03 09:42:55
 */

import Request, { RequestConfig } from './request';

interface ZResponse<T> {
    statusCode: number
    msg: string
    result: T
}

interface ZRequestConfig<T, R> extends RequestConfig<ZResponse<R>> {
    data?: T
}


const request: Request = new Request({
})


export const zRequest = <D = any, T = any>(config: ZRequestConfig<D, T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<ZResponse<T>>(config)
}

export default Request;

