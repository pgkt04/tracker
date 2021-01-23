import axios from 'axios'
import { API_URL } from './AppConfig'

const getAxiosInstance = () => {
    return axios.create({ baseURL: `${API_URL}/` })
}

export let api = getAxiosInstance();