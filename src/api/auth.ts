import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({baseURL: BASE_URL+'/user/'});

export function userLogin(body: {email: string, password: string}) {
    return axiosInstance.post("login", body);
}

export function userRegister(body: {email: string, password: string, name: string}) {
    return axiosInstance.post("create", body);
}

export function userLogout() {
    return axiosInstance.get("logout");
}