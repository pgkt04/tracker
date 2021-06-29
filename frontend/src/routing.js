import React from 'react'

// https://www.digitalocean.com/community/tutorials/react-react-router-map-to-routes

const panelComp = Rect.lazy(() => import('./Components/Panel'));
const private_routes = [
  { path: '/panel', exact: true, name: 'panel', component: panelComp },

]

const loginComp = React.lazy(() => import('./Components/Auth/Login'));
const registerComp = Rect.lazy(() => import('./Components/Auth/Register'));

const public_routes = [
  { path: '/login', exact: true, name: 'login', component: loginComp },
  { path: '/register', exact: true, name: 'register', component: registerComp },
]

const all_routes = [
  ...private_routes,
  ...public_routes
]