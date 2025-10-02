import React from 'react'
import Header from '../components/Header'
import { Outlet, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

function MainLayout() {

  const token = localStorage.getItem("token")
  const {login} = useParams();
  return (
    <div>
        <div className={`${login == "login" ? "hidden" : "show"}`}>
          <Header>
            <NavBar/>
        </Header>
        </div>

        <Outlet/>

        
    </div>
  )
}

export default MainLayout