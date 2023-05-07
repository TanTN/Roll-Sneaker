
import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {AiOutlineDoubleLeft} from 'react-icons/ai'
import { useNavigate } from 'react-router'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validateLogin } from '../component/utils/axios'

const Login = () => {
    const [isLoginFalse,setIsLoginFalse] = useState(false) 
    const isMobile = useSelector(state => state.store.isMobile) 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialValues = {
      username:'',
      password:'',

    }
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={ async(values) => {
      const isLogin = await validateLogin(values,dispatch)
      if (isLogin) {
        setIsLoginFalse(false)
        navigate('/')
      } else {
        setIsLoginFalse(true)
      }
    }}

    >
        {(formik) => (
            <div className='md:grid md:grid-cols-3'>
                {!isMobile && 
                  <div className='md:col-span-2 md:h-[100vh]'>
                      <img className='h-[100%] object-cover' src="https://shopgiayreplica.com/wp-content/uploads/2023/04/khai-truong-shopnew-hcm.jpg" alt="store" />
                  </div>
                }
                <div className='w-100% text-lg font-semibold'>
                    <div className='text-2xl relative text-white bg-[#ecc813] leading-[50px] text-center'>
                      User Login
                      <div className='absolute top-[50%] left-[10px] p-[7px] rounded-sm border-[1px] border-[#a8a597d2] translate-y-[-50%] text-white' onClick={() => navigate('/')} >
                        <AiOutlineDoubleLeft />
                      </div>
                    </div>
                    <div className='mx-auto px-[40px] mt-[50px]'>
                      <Form>
                          <div className='mb-[10px]'>
                            <label htmlFor="username" >Username</label>
                            <Field type='text' name='username' className='input-style'/>
                          </div>
                          <div className='mb-[10px]'>
                            <label htmlFor="password">Password</label>
                            <Field type='password' name='password' className='input-style'/>

                          </div>
                          {isLoginFalse && (<div className='text-primary text-center font-normal'>Tên đăng nhập hoặc mật khẩu không đúng.</div>)}
                          <div className='flex w-[100%] mt-[30px]'>
                            <button type='submit' className='mx-auto border-[2px] border-[#ecc813] min-w-[90%] leading-[40px] text-[#ecc813] text-xl rounded-[20px]'>
                              Sign in
                            </button>
                          </div>
                          <div className='flex w-[100%] mt-[10px]'>
                            <button type='submit' className='mx-auto border-[2px] border-[#139cec] min-w-[90%] leading-[40px] text-[#139cec] text-xl rounded-[20px]' onClick={() => navigate('/register')}>
                              Sign up
                            </button>
                          </div>
                      </Form>
                    </div>
                </div>
            </div>
        )}
    </Formik>
  )
}

export default Login