import axios from 'axios'

const instance = axios.create({
    baseUrl: "http://127.0.0.1:9000"
})


export default instance