import http from '../libs/http';

export default class SampleService {
    static getUserList() {
        return http.get('https://jsonplaceholder.typicode.com/users');
    }
}
