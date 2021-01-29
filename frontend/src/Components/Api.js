import axios from 'axios'
import { API_URL } from './AppConfig'

export const getAxiosInstance = (conf = {}) => {
    return axios.create({ baseURL: `${API_URL}/`, ...conf })
}

export let api = getAxiosInstance();