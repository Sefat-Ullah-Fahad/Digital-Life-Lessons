import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default function RootLayout() {
  return (
    <div>
      <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
