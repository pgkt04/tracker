import axios from 'axios'
import { API_URL } from './AppConfig'

export const getAxiosInstance = (conf = {}) => {
  return axios.create({ baseURL: `${API_URL}/`, ...conf });
}

// sets a token into storage
//
export function setToken(t) {
  localStorage.setItem('token', t);
}

// removes token from storage
//
export function clearToken() {
  localStorage.setItem('token', null);
}

// returns axios with token set from local storage
//
export const getAuthenticatedAxios = () => {
  let token = localStorage.getItem('token');
  return axios.create(
    {
      baseURL: `${API_URL}/`,
      headers: { 'Authorization': `token ${token}` }
    });
}

export let api = getAxiosInstance();
export let auth_api = getAuthenticatedAxios();