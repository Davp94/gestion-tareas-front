import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7500',
    headers: {'Content-Type': 'application/json'},
})

instance.interceptors.request.use(
   
);

instance.interceptors.response.use(
);

export const http = instance;

export default http;