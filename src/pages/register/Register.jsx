import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineLoading } from 'react-icons/ai';

import { validateRegister } from '@/services/validateFormService';
import { postUser } from '@/services/userService';
import { setIsAdmin, setIsLogin, setUserCurrent } from '@/store/reducerStore';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const root = useRef();

    const initialValues = {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    // Yup validate
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
        phone: Yup.string().trim().required('Email field is required'),
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
                    const user = { ...values, products: [], information: {}, isAdmin: false, id: uuidv4() };
                    await postUser(user);
                    dispatch(setUserCurrent(user));
                    dispatch(setIsLogin(true));
                    dispatch(setIsAdmin(false));

                    toast.success('Bạn đã đăng kí tài khoản thành công!', {
                        autoClose: 1000,
                    });
                    setTimeout(() => navigate('/'), 2000);
                }

                if (!isEmail && !isUsername) {
                    toast.error('Username đã tồn tại', {
                        autoClose: 3000,
                    });
                } else {
                    if (!isEmail) {
                        toast.error('Email đã được đăng kí', {
                            autoClose: 3000,
                        });
                    } else if (!isUsername) {
                        toast.error('Username đã tồn tại', {
                            autoClose: 3000,
                        });
                    }
                }
            }}
        >
            {(formik) => (
                <div className="flex justify-center items-center w-screen h-screen bgRegister lg:bg-[rgb(209,178,217)] lg:noBg">
                    <div className="flex flex-row-reverse w-[90%] md:w-[50%] lg:w-[932px] lg:min-h-[600px] bg-white rounded-[10px] overflow-hidden">
                        {/* content right */}
                        <div className="hidden lg:flex flex-col gap-10 flex-1 p-[50px] bgRegister text-white">
                            <span className="text-[100px] leading-[100px] font-semibold font-Crimson">
                                Roll Sneaker.
                            </span>

                            <p className="text-sm text-center">
                                Tiền nhiệm là Shopgiayreplica.com™ - Shop Uy tín lâu năm chuyên cung cấp giày thể thao
                                sneaker nam, nữ hàng Replica 1:1 - Like Auth với chất lượng khác biệt so với thị trường
                                và giá tốt nhất. Shop có sẵn hàng tại 2 cơ sở Hà Nội, tp HCM. Giao hàng nhanh toàn quốc,
                                đổi trả, bảo hành linh hoạt.
                                <br /> Bạn không đủ hầu bao để mua 1 đôi Chính Hãng? Hay bạn order quá lâu cũng như size
                                của mình đã Sold Out? Bạn đang cần tìm các mẫu Sneaker với mong muốn chất lượng, detail
                                chuẩn hàng Auth? Roll Sneaker sẽ giải quyết hết thắc mắc của bạn với chất lượng cực kỳ
                                khác biệt, đa dạng mẫu mã, có sẵn hàng. Liên tục cập nhật, update, fix các phiên bản
                                tiệm cận hàng Auth nhất. Các bạn có thể yên tâm lựa chọn trong một thị trường rất hỗn
                                loạn về chất lượng, cũng như định nghĩa chuẩn về Giày Replica - Like Auth.
                            </p>

                            <div>
                                <span className=" font-medium">Do you have an account ?</span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <button
                                    className="w-[50%] p-[5px] bg-white text-black font-medium"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <p className="font-bold text-[#1a08b8]">or</p>
                                <Link
                                    to="/"
                                    className="cursor-pointer text-white hover:translate-y-[-2px] hover:text-sh"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>

                        <div className="flex relative flex-col gap-10 flex-1 w-100% font-semibold p-[30px] md:p-[50px]">
                            <h1 className="text-black font-Crimson">Register</h1>

                            <div>
                                {/* error message */}
                                <ToastContainer />

                                <Form className="flex flex-col gap-0">
                                    <div className="text-sm">
                                        <Field
                                            type="text"
                                            name="username"
                                            className="input-style"
                                            placeholder="Username"
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="span"
                                            className="text-primary font-normal text-sm leading-[30px]"
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <Field
                                            type="email"
                                            name="email"
                                            className="input-style"
                                            placeholder="Email address"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-primary font-normal text-sm leading-[30px]"
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <Field
                                            type="phone"
                                            name="phone"
                                            className="input-style"
                                            placeholder="Phone number"
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="span"
                                            className="text-primary font-normal text-sm leading-[30px]"
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="input-style"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-primary font-normal text-sm leading-[30px]"
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="input-style"
                                            placeholder="Confirm Password"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="span"
                                            className="text-primary font-normal text-sm leading-[30px]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex gap-1 justify-center items-center bg-[#e58eef] w-[50%] p-[5px] mt-[20px] text-white"
                                    >
                                        {formik.isSubmitting && (
                                            <AiOutlineLoading className="animate-fadeInLoadingIconRotate" />
                                        )}
                                        Register
                                    </button>

                                    {/* on mobile */}
                                    <div className="flex gap-2 mt-[20px] lg:hidden">
                                        <span className="font-medium text-[#6e6e6e]">Don't have account?</span>
                                        <span
                                            className=" text-black font-bold cursor-pointer"
                                            onClick={() => navigate('/login')}
                                        >
                                            Login
                                        </span>
                                        <p className="font-bold text-[#1a08b8]">or</p>
                                        <Link to="/" className="cursor-pointer font-bold hover:translate-y-[-2px]">
                                            Back
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default Register;
