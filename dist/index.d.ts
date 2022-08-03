import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

interface RequestOptions extends AxiosRequestConfig {
    loading?: boolean;
    interceptors?: Interceptors;
}
interface Interceptors {
    requestInterceptor?: (config: AxiosRequestConfig) => (AxiosRequestConfig);
    requestInterceptorErr?: (error: any) => any;
    responseInterceptor?: (res: AxiosResponse) => (AxiosResponse);
    responseInterceptorErr?: (error: any) => any;
}
declare class ZRequest {
    instance: AxiosInstance;
    options: RequestOptions;
    interceptor?: Interceptors;
    loading: boolean;
    constructor(options: RequestOptions);
    request<T>(config: RequestOptions): Promise<T>;
}

export { RequestOptions, ZRequest as default };
