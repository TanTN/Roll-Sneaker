import './App.css'
import {Routes,Route} from 'react-router'
import { useEffect, useState } from 'react';
import Login from './page/Login';
import Main from './page/Main';
import Register from './page/Register';
import ShoppingCart from './page/ShoppingCart';
import DetailProduct from './page/DetailProduct';
import { useDispatch } from 'react-redux';
import { setMobile } from './redux/reducer';


function App() {
  const [isMobile, setIsMobile] = useState(true)
  const [widthDisplay , setWidthDisplay] = useState(undefined)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleWidthDp = () => {
      setWidthDisplay(window.innerWidth)
      setIsMobile(widthDisplay < 768)
      dispatch(setMobile(isMobile))
    }

    window.addEventListener('resize', handleWidthDp)
    return () => window.removeEventListener('resize', handleWidthDp)
  },[widthDisplay])
  return (
    <div className=''>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Main />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/shoppingCart' element={<ShoppingCart />}/>
        <Route path='/detailProduct' element={<DetailProduct />}/>
      </Routes>
    </div>
  
  )
}

export default App
