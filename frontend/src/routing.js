import React from 'react'

// https://reactjs.org/docs/code-splitting.html
// https://www.digitalocean.com/community/tutorials/react-react-router-map-to-routes

const panelComp = React.lazy(() => import('./Components/Panel'));
const trackercomp = React.lazy(() => import('./Components/Features/Tracker'));

export const private_routes = [
  { path: '/', exact: true, name: 'panel', component: panelComp },
  { path: '/tracker', exact: true, name: 'tracker', component: trackercomp },
]

const loginComp = React.lazy(() => import('./Components/Auth/Login'));
const registerComp = React.lazy(() => import('./Components/Auth/Register'));

export const public_routes = [
  { path: '/', exact: true, name: 'panel', component: panelComp },
  { path: '/login', exact: true, name: 'login', component: loginComp },
  { path: '/register', exact: true, name: 'register', component: registerComp },
]

const all_routes = [
  ...private_routes,
  ...public_routes
]


export default all_routes;