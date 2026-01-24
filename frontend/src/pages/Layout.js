import React from 'react'
import { Outlet } from 'react-router'
import Navabr from '../components/Navabr'

function Layout() {
  return (
    <>
      <Navabr/>
      <Outlet/>
    
    </>
  )
}

export default Layout
