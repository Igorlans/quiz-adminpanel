import axios from "axios";
import {API_URL} from "../config.js";

export const addQuestion = async (body) => {
    try {
        const response = await axios.post(`${API_URL}api/question`, body);
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
        console.log(e?.response?.data?.message);
    }
}
export const getQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}api/question`);
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
        console.log(e?.response?.data?.message);
    }
}