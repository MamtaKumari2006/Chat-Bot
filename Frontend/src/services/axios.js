import axios from "axios";

const api = axios.create({
    baseURL: "https://chat-bot-9pc9.onrender.com/",
    withCredentials: true,
    headers : {
        'content-type': 'application/json',
    }

})

export default api;