import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function MainLayout() {
  return (
    <div>
        <Header>
            <NavBar/>
        </Header>

        <Outlet/>

        
    </div>
  )
}

export default MainLayout