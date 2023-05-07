
import React, { useState } from 'react'
import Navbar from '../component/Main/Navbar'
import Container from '../component/Main/container/Container'
import Footer from '../component/Main/Footer'

const Main = () => {
  const [isOverflow,setIsOverflow] = useState(false)
  return (
    <div className={`overflow-x-hidden relative ${isOverflow ? 'overflow-hidden h-[100vh]' : ''} max-w-[1140px] mx-auto`} >
        <Navbar  setIsOverflow={setIsOverflow}/>
        <Container />
        <Footer />
    </div>
  )
}

export default Main