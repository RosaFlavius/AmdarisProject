import React from 'react'
import Annoucement from '../components/Annoucement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'

function Home() {
  return (
    <div>
        <Annoucement/>
        <Navbar/>
        <Slider/>
        <Footer/>
    </div>
  )
}

export default Home