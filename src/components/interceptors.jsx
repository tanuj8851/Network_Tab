
import axios from 'axios';

const networkRequests = [];

const requestInterceptor = axios.interceptors.request.use((config) => {
    const request = {
        id: networkRequests.length,
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers,
        startTime: new Date().getTime(),
        initiator: 'User'
    };
    networkRequests.push(request);
    return config;
});

const responseInterceptor = axios.interceptors.response.use(
    (response) => {
        const request = networkRequests.find((req) => req.id === networkRequests.length - 1);
        request.endTime = new Date().getTime();
        request.duration = request.endTime - request.startTime;
        request.status = response.status;
        request.size = new Blob([JSON.stringify(response.data)]).size;
        request.type = response.headers['content-type'];
        request.response = response.data;
        request.responseHeaders = response.headers;
        return response;
    },
    (error) => {
        const request = networkRequests.find((req) => req.id === networkRequests.length - 1);
        request.endTime = new Date().getTime();
        request.duration = request.endTime - request.startTime;
        request.status = error.response?.status;
        request.size = error.response?.data ? new Blob([JSON.stringify(error.response.data)]).size : 0;
        request.type = error.response?.headers['content-type'];
        request.response = error.response?.data;
        request.responseHeaders = error.response?.headers;
        request.error = error;
        return Promise.reject(error);
    }
);

export { networkRequests, requestInterceptor, responseInterceptor };
