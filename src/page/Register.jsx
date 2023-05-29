import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import { postUser, validateRegister } from '../axios/axios';

const Register = () => {
    const navigate = useNavigate();
    
    const user = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);

    const [messageEmail, setMessageEmail] = useState(false);
    const [messageUsername, setMessageUsername] = useState(false);

    const isMessageAndUsername = () => {
        setTimeout(() => {
            setMessageEmail(false);
            setMessageUsername(false);
        }, 5000);
    };

    const handleBack = () => {
        if (isLogin) {
            navigate(`/user/${user.username}`);
        } else {
            navigate('/');
        }
    };

    const initialValues = {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .trim()
            .required('Username field is required')
            .min(2, 'Must be 2 characters be more and max be 20 character')
            .max(15, 'Must be 2 characters be more and max be 15 character'),
        email: Yup.string()
            .trim()
            .required('Email field is required')
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'),
        phone: Yup.string()
            .trim()
            .required('Phone number field is required')
            .matches(/^0\d{8,9}$/, 'Please enter a valid phone number'),
        password: Yup.string().trim().required('Password field is required').min(4, 'Must be 4 characters be more'),
        confirmPassword: Yup.string()
            .trim()
            .required('Confirm password field is required')
            .oneOf([Yup.ref('password')], 'Password must match'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const { isEmail, isUsername } = await validateRegister(values);
                if (isEmail && isUsername) {
                    await postUser({ ...values, products: [], information: {} });
                    await navigate('/login');
                }
                if (!isEmail) {
                    setMessageEmail(true);
                    isMessageAndUsername();
                }
                if (!isUsername) {
                    setMessageUsername(true);
                    isMessageAndUsername();
                }
            }}
        >
            {(formik) => (
                <div className="md:grid md:grid-cols-3">
                    <div className="hidden md:block md:col-span-2 md:h-[100vh]">
                        <img
                            className="h-[100%] object-cover"
                            src="https://shopgiayreplica.com/wp-content/uploads/2023/04/khai-truong-shopnew-hcm.jpg"
                            alt="store"
                        />
                    </div>

                    <div className="w-100% text-lg font-semibold">
                        <div className="text-2xl relative text-white bg-[#139cec] leading-[50px] text-center md:mx-[100px] md:bg-white md:text-[#139cec] md:text-[35px] md:mt-[30px]">
                            Sign Up
                        </div>
                        <div className="mx-auto px-[40px] mt-[50px] md:px-[50px] xl:px-[100px] 2xl:px-[140px]">
                            
                            <Form>
                                <Tippy
                                    placement="bottom"
                                    offset={[0, 3]}
                                    visible={messageUsername}
                                    render={(attrs) => (
                                        <div className="box w-[100%]" tabIndex="-1" {...attrs}>
                                            <div className="bg-[#6586D2] text-white leading-[30px] px-[50px] rounded-2xl">
                                                Username đã tồn tại
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div className="mb-[10px] text-sm">
                                        <label htmlFor="username">Username</label>
                                        <Field type="text" name="username" className="input-style" />
                                        <ErrorMessage
                                            name="username"
                                            component="span"
                                            className="text-primary font-normal text-[15px]"
                                        />
                                    </div>
                                </Tippy>

                                <Tippy
                                    placement="bottom"
                                    offset={[0, 3]}
                                    visible={messageEmail}
                                    render={(attrs) => (
                                        <div className="box w-[100%]" tabIndex="-1" {...attrs}>
                                            <div className="bg-[#6586D2] text-white leading-[30px] px-[50px] rounded-2xl">
                                                Email đã tồn tại
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div className="mb-[10px] text-sm">
                                        <label htmlFor="email">Email address</label>
                                        <Field type="email" name="email" className="input-style" />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-primary font-normal text-[15px]"
                                        />
                                    </div>
                                </Tippy>

                                <div className="mb-[10px] text-sm">
                                    <label htmlFor="phone">Phone number</label>
                                    <Field type="text" name="phone" className="input-style" placeholder="+84:" />
                                    <ErrorMessage
                                        name="phone"
                                        component="span"
                                        className="text-primary font-normal text-[15px]"
                                    />
                                </div>

                                <div className="mb-[10px] text-sm">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" className="input-style" />
                                    <ErrorMessage
                                        name="password"
                                        component="span"
                                        className="text-primary font-normal text-[15px]"
                                    />
                                </div>

                                <div className="mb-[10px] text-sm">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field type="password" name="confirmPassword" className="input-style" />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="span"
                                        className="text-primary font-normal text-[15px]"
                                    />
                                </div>

                                <div className="flex w-[100%] mt-[50px]">
                                    <button
                                        type="submit"
                                        className="mx-auto border-[2px] border-[#139cec] min-w-[100%] leading-[40px] text-[#139cec] text-lg rounded-[4px] hover:bg-[#139cec] hover:text-white"
                                    >
                                        Sign up
                                    </button>
                                </div>

                                <div className="flex w-[100%] mt-[10px] md:mt-[20px]">
                                    <button
                                        className="mx-auto flex justify-center items-center border-[2px] border-[#cfcfcf] min-w-[100%] leading-[40px] text-[#868686] text-lg rounded-[4px] hover:bg-[#e0e0e0]"
                                        onClick={() => navigate('/login')}
                                    >
                                        <HiOutlineArrowLeft />
                                        <div className="ml-2">Back to Login</div>
                                    </button>
                                </div>
                                <div className="text-center pt-[10px] text-sm">
                                    <p className="font-medium text-[#2c2c2c]">or</p>
                                    <p className="cursor-pointer" onClick={handleBack}>
                                        Back
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default Register;
