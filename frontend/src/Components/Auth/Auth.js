import React, { Component, Fragment } from 'react'
import { getAxiosInstance } from '../Api'

export const IsVerified = () => {
  let token = localStorage.getItem('token')
  if (token) {
    let api = getAxiosInstance({ headers: { 'Authorization': `token ${token}` } })

    api.post('auth/verify/')
      .then(response => {
        return response.data.detail === 'success'
      })
      .catch(error => {
        console.log(error)
      })
  }
  return false
}
