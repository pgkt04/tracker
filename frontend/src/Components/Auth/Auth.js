import React, { Component, Fragment } from 'react'
import { getAxiosInstance } from '../Api'

export const isVerified = () => {
  let token = localStorage.getItem('token')
  if (token) {
    let api = getAxiosInstance({ headers: { 'Authorization': `token ${token}` } })
    let promise = api.post('auth/verify/')
    let promiseData = promise.then(response => response.data)
    return promiseData
  }
}
