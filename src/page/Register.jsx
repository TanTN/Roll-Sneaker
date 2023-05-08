import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Tippy from '@tippyjs/react/headless';
import {AiOutlineDoubleLeft} from 'react-icons/ai'
import { useNavigate } from 'react-router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { postUser, validateRegister } from '../utils/axios'

const Register = () => {
    const [messageEmail,setMessageEmail] = useState(false) 
    const [messageUsername,setMessageUsername] = useState(false) 
    const isMobile = useSelector(state => state.store.isMobile) 
    const isLogin = useSelector(state => state.store.isLogin) 
    const navigate = useNavigate()
    const isMessageAndUsername = () => {
      setTimeout(() => {
        setMessageEmail(false)
        setMessageUsername(false)
      },5000)
    }

    const initialValues = {
      username:'',
      email:'',
      phone:'',
      password:'',
      confirmPassword:''

    }
    const validationSchema = Yup.object().shape({
      username:Yup.string().required('Username field is required').min(2,'Must be 2 characters be more'),
      email:Yup.string().required('Email field is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please enter a valid email'),
      phone:Yup.string().required('Phone number field is required').matches(/^0\d{8,9}$/,'Please enter a valid phone number'),
      password:Yup.string().required('Password field is required').min(4,'Must be 4 characters be more'),
      confirmPassword:Yup.string().required('Confirm password field is required').oneOf([Yup.ref('password')],'Password must match')
    })
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={ async(values) => {
      const {isEmail,isUsername} = await validateRegister(values)
      console.log({isEmail,isUsername})
      if (isEmail && isUsername) {
        await postUser(values)
        await navigate('/login')
      }
      if (!isEmail) {
        setMessageEmail(true)
        isMessageAndUsername()
      }
      if (!isUsername) {
        setMessageUsername(true)
        isMessageAndUsername()
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
                      Sign Up
                      {isLogin && (<div className='absolute top-[50%] left-[10px] p-[7px] rounded-sm border-[1px] border-[#b0b2ee] translate-y-[-50%] text-white cursor-pointer hover:text-[#7075f7] hover:bg-[#dfbb06]'onClick={() => navigate('/')} >
                        <AiOutlineDoubleLeft />
                      </div>)}
                    </div>
                    <div className='mx-auto px-[40px] mt-[50px]'>
                      <Form>
                          <Tippy
                            placement='bottom'
                            offset={[0,3]}
                            visible={messageUsername}
                            render={attrs => (
                              <div className="box w-[100%]" tabIndex="-1" {...attrs}>
                                <div className='bg-[#6586D2] text-white leading-[30px] px-[50px] rounded-2xl'>
                                  Username đã tồn tại
                                </div>
                              </div>
                            )}
                          >
                            <div className='mb-[10px]'>
                              <label htmlFor="username" >Username</label>
                              <Field type='text' name='username' className='input-style' />
                              <ErrorMessage name='username' component='span' className='text-primary font-normal text-[15px]'/>
                            </div>
                          </Tippy>

                          <Tippy
                            placement='bottom'
                            offset={[0,3]}
                            visible={messageEmail}
                            render={attrs => (
                              <div className="box w-[100%]" tabIndex="-1" {...attrs}>
                                <div className='bg-[#6586D2] text-white leading-[30px] px-[50px] rounded-2xl'>
                                  Email đã tồn tại
                                </div>
                              </div>
                            )}
                          >
                            <div className='mb-[10px]'>
                              <label htmlFor="email">Email address</label>
                              <Field type='email' name='email' className='input-style'/>
                              <ErrorMessage name='email' component='span' className='text-primary font-normal text-[15px]'/>
                            </div>
                          </Tippy>

                          <div className='mb-[10px]'>
                            <label htmlFor="phone">Phone number</label>
                            <Field type='text' name='phone' className='input-style' placeholder='+84:'/>
                            <ErrorMessage name='phone' component='span' className='text-primary font-normal text-[15px]'/>
                            
                          </div>

                          <div className='mb-[10px]'>
                            <label htmlFor="password">Password</label>
                            <Field type='password' name='password' className='input-style'/>
                            <ErrorMessage name='password' component='span' className='text-primary font-normal text-[15px]'/>
                          </div>

                          <div className='mb-[10px]'>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field type='password' name='confirmPassword' className='input-style'/>
                            <ErrorMessage name='confirmPassword' component='span' className='text-primary font-normal text-[15px]'/>
                          </div>

                          <div className='flex w-[100%] mt-[30px]'>
                            <button type='submit' className='mx-auto border-[2px] drop-shadow-[0_0_7px_#f3d64380] border-[#139cec] min-w-[90%] leading-[40px] text-[#139cec] text-xl rounded-[20px] hover:bg-[#139cec] hover:text-white'>
                              Sign up
                              </button>
                          </div>

                          <div className='flex w-[100%] mt-[10px]'>
                            <button className='mx-auto border-[2px] drop-shadow-[0_0_7px_#f3d64380] border-[#ecc813] min-w-[90%] leading-[40px] text-[#ecc813] text-xl rounded-[20px] hover:bg-[#ecc813] hover:text-white' onClick={() => navigate('/login')}>
                              Sign in
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

export default Register