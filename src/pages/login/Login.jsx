import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { validateLogin } from '@/services/validateFormService';

import { AiOutlineLoading } from 'react-icons/ai';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoginFalse, setIsLoginFalse] = useState(false);

    const initialValues = {
        username: '',
        password: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                const isLogin = await validateLogin(values, dispatch);
                if (isLogin) {
                    await setIsLoginFalse(false);
                    await navigate('/');
                } else {
                    setIsLoginFalse(true);
                }
            }}
        >
            {(formik) => (
                <div className="flex w-screen h-screen justify-center items-center bgLogin lg:bg-[rgb(209,178,217)] lg:noBg">
                    <div className="flex w-[90%] md:w-[50%] lg:w-[932px] lg:min-h-[600px] bg-white rounded-[10px] overflow-hidden">

                        {/* content left */}
                        <div className="hidden lg:flex flex-col gap-10 flex-1 text-white bgLogin p-[50px]">
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
                                <span className=" font-medium text-white">Don't have account ?</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    className="w-[50%] p-[5px] bg-white text-black font-medium"
                                    onClick={() => navigate('/register')}
                                >
                                    Sign up
                                </button>
                                <p className="font-bold text-[#1a08b8]">or</p>
                                <Link to="/" className="cursor-pointer hover:translate-y-[-2px] hover:text-sh">
                                    Back
                                </Link>
                            </div>
                        </div>

                        {/* content right */}
                        <div className="flex gap-10 w-[100%] justify-center flex-col lg:flex-1 font-semibold p-[30px] md:p-[50px]">
                            <h1 className="font-Crimson leading-[50px] text-black">Login</h1>
                            <Form className="flex gap-4 flex-col">
                                <div className="text-sm">
                                    <Field type="text" name="username" className="input-style" placeholder="Username" />
                                </div>
                                <div className="text-sm">
                                    <Field
                                        type="password"
                                        name="password"
                                        className="input-style"
                                        placeholder="Password"
                                    />
                                </div>

                                {isLoginFalse && (
                                    <div className=" text-primary font-normal text-[14px]">
                                        Tên đăng nhập hoặc mật khẩu không đúng.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="flex gap-1 justify-center items-center p-[5px] w-[50%] text-center text-white bg-[#938eef]"
                                >
                                    {formik.isSubmitting && (
                                        <AiOutlineLoading className="animate-fadeInLoadingIconRotate" />
                                    )}
                                    Sign in
                                </button>
                                
                                {/* mobile */}
                                <div className="flex gap-2 lg:hidden">
                                    <span className="font-medium text-[#6e6e6e]">Don't have account?</span>
                                    <span
                                        className=" text-black font-bold cursor-pointer"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
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
            )}
        </Formik>
    );
};

export default Login;
