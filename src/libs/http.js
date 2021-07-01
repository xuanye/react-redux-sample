import axios from 'axios';

const createHttp = () => {
    const http = axios.create();
    http.defaults.baseURL = '/api';
    http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    http.defaults.headers['Access-Control-Allow-Origin'] = '*';
    http.defaults.transformRequest = http.defaults.transformRequest || [];
    http.defaults.transformRequest.push(data => {
        if (typeof data === 'object') {
            return data;
        }

        let str = '';
        if (!data) {
            return str;
        }
        try {
            const json = JSON.parse(data);
            for (const a in json) {
                if (str !== '') {
                    str += `&${a}=${encodeURIComponent(json[a])}`;
                } else {
                    str += `${a}=${encodeURIComponent(json[a])}`;
                }
            }
            return str;
        } catch (error) {
            return data;
        }
    });
    http.interceptors.request.use((config = {}) => {
        const after = { ...config };
        //TODO:可以加一下请求的公共参数，或者head中添加参函数等
        return after;
    });
    http.interceptors.response.use(
        rsp => {
            const data = rsp.data;
            // if (rsp.status === 200 && data.returnCode === 0) {
            //     return data;
            // }
            if (rsp.status === 200) {
                return data;
            }
            // return data;
            return Promise.reject(data);
        },
        error => {
            console.error(error);
            const errData = {
                returnCode: error.response.status,
                returnMessage: '获取信息失败啦，请稍后再试~',
            };
            return Promise.reject(errData);
        },
    );
    return http;
};

export default createHttp();
