import { getAxiosInstance } from '../Api'

export function isVerified() {
  let token = localStorage.getItem('token')
  if (token) {
    let api = getAxiosInstance({
      headers: { 'Authorization': `token ${token}` }
    })
    let promise = api.post('auth/verify/')
    let promiseData = promise.then(response => response.data)
    return promiseData
  }
}

/**
 * Gets data for verification if a token has been set in localstorage
 */
export async function getUserInfo() {
  let token = localStorage.getItem('token')
  if (token) {
    let api = getAxiosInstance({
      headers: { 'Authorization': `token ${token}` }
    })
    const response = await api.post('auth/verify/')
    // return response.data.detail === 'success'
    return response.data
  }
}
