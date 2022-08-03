import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: Interceptors<T>;
}
interface Interceptors<T> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorErr?: (error: any) => any;
    responseInterceptor?: (res: T) => T;
    responseInterceptorErr?: (error: any) => any;
}
declare class Request {
    instance: AxiosInstance;
    config: RequestConfig;
    interceptor?: Interceptors<AxiosResponse>;
    constructor(config: RequestConfig);
    request<T>(config: RequestConfig<T>): Promise<T>;
}

interface ZResponse<T> {
    statusCode: number;
    msg: string;
    result: T;
}
interface ZRequestConfig<T, R> extends RequestConfig<ZResponse<R>> {
    data?: T;
}
declare const zRequest: <D = any, T = any>(config: ZRequestConfig<D, T>) => Promise<ZResponse<T>>;

export { Request as default, zRequest };
