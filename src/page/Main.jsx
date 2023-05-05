
import React from 'react'
import Navbar from '../component/Main/Navbar'
import Container from '../component/Main/container/Container'
import Footer from '../component/Main/Footer'

const Main = () => {
  return (
    <div className='overflow-x-hidden'>
        <Navbar />
        <Container />
        <Footer />
    </div>
  )
}

export default Main