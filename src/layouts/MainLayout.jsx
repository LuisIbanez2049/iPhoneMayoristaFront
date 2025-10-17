import React from 'react'
import Header from '../components/Header'
import { Outlet, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

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

        <div className={`${login == "login" ? "hidden" : token ? "hidden" : "show"}`}>
          <Footer/>
        </div>
    </div>
  )
}

export default MainLayout