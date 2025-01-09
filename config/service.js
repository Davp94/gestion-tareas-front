import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {'Content-Type': 'application/json'},
})

instance.interceptors.request.use(
   
);

instance.interceptors.response.use(
);

export const http = instance;

export default http;