import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "https://jobmanagement-v40a.onrender.com/api",
    // baseURL: "http://localhost:5000/api",
})