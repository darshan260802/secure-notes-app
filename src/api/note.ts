import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const axiosInstance = axios.create({baseURL: BASE_URL+'/notes/'});

export function getNotes() {
    return axiosInstance.get("get-all");
}

export function createNote(body: {title: string, description: string}) {
    return axiosInstance.post("create", body);
}

export function updateNote(body: {noteId: string, title: string, description: string}) {
    return axiosInstance.post("update", body);
}

export function deleteNote(body: {noteId: string}) {
    return axiosInstance.post("delete", body);
}