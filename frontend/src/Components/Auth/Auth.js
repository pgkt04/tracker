import React, { Component, Fragment } from 'react'
import { getAxiosInstance } from '../Api'

export function isVerified() {
  let token = localStorage.getItem('token')
  if (token) {
    let api = getAxiosInstance({ headers: { 'Authorization': `token ${token}` } })
    let promise = api.post('auth/verify/')
    let promiseData = promise.then(response => response.data)
    return promiseData
  }
}

export async function isVerifiedAsync() {
  let token = localStorage.getItem('token')
  if (token) {
    let api = getAxiosInstance({ headers: { 'Authorization': `token ${token}` } })
    const response = await api.post('auth/verify/')
    return response.data.detail === 'success'
  }
  return false
}
