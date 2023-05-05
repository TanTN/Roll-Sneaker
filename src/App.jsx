import './App.css'
import {Routes,Route} from 'react-router'
import { ErrorMessage, Field, useFormik } from 'formik';
import { useId, useState } from 'react';
import Login from './page/Login';
import Main from './page/Main';
import Register from './page/Register';
import ShoppingCart from './page/ShoppingCart';
import DetailProduct from './page/DetailProduct';


function App() {

  return (
    <div className='App'>
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
