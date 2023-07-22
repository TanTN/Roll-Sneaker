import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { AiOutlineLoading } from 'react-icons/ai';

import { validateRegister } from '@/services/validateFormService';
import { postUser } from '@/services/userService';

import { Link } from 'react-router-dom';
import { setIsLogin, setUserCurrent } from '../../store/reducerStore';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const root = useRef();

    const handleAddMessage = (content, isRegisterSuccess) => {
        const main = root.current;
        if (main) {
            const toast = document.createElement('div');

            const clearSetTimeout = setTimeout(() => main.removeChild(toast), 3600);

            toast.onclick = (e) => {
                if (e.target.closest('.close')) {
                    main.removeChild(toast);
                    clearTimeout(clearSetTimeout);
                }
            };
            toast.innerHTML = `
            <div class=${isRegisterSuccess ? 'text-[#3DDC84]' : 'text-primary'}>
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <div class='ml-3'>
                <p class=${isRegisterSuccess ? 'text-[#3DDC84] font-medium' : 'text-primary font-medium'}>Error</p>
                <p class='text-sm font-normal'>${content}</p>
            </div>
            <div class='close absolute top-1 right-2'>
                <i class="fa-solid fa-xmark text-gray-400"></i>
            </div>
            `;
            toast.classList.add('toast-messgae');
            toast.classList.add(`${isRegisterSuccess && 'border-[#3DDC84]'}`);
            main.appendChild(toast);
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

                    handleAddMessage('Bạn đã đăng kí tài khoản thành công', true);
                    setTimeout(() => navigate('/'), 3000);
                }

                if (!isEmail && !isUsername) {
                    handleAddMessage('Username đã tồn tại');
                } else {
                    if (!isEmail) {
                        handleAddMessage('Email đã được đăng kí');
                    } else if (!isUsername) {
                        handleAddMessage('Username đã tồn tại');
                    }
                }
            }}
        >
            {(formik) => (
                <div className="flex justify-center items-center w-screen h-screen bg-[rgb(209,178,217)]">
                    <div className="flex flex-row-reverse w-[50%] min-h-[600px] bg-white rounded-[10px] overflow-hidden">
                        <div className="flex flex-col gap-10 flex-1 p-[50px] bgRegister text-white">
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

                        <div className="flex flex-col gap-10 flex-1 w-100% font-semibold p-[50px]">
                            <div className="text-xl text-black font-Crimson lg:text-[35px] leading-[50px]">
                                Register
                            </div>
                            <div className="">
                                <div className="fixed top-[5%] right-[2%]" ref={root}></div>

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
                                            className="text-primary font-normal text-[15px] leading-[30px]"
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
                                            className="text-primary font-normal text-[15px] leading-[30px]"
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
                                            className="text-primary font-normal text-[15px] leading-[30px]"
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
                                            className="text-primary font-normal text-[15px] leading-[30px]"
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
                                            className="text-primary font-normal text-[15px] leading-[30px]"
                                        />
                                    </div>

                                    <div className="mt-[20px]">
                                        <button
                                            type="submit"
                                            className="flex gap-1 justify-center items-center bg-[#e58eef] w-[50%] p-[5px] text-white"
                                        >
                                            {formik.isSubmitting && (
                                                <AiOutlineLoading className="animate-fadeInLoadingRotate" />
                                            )}
                                            Register
                                        </button>
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
