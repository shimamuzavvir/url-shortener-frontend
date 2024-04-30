import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup'
import './Style/form.css'

const ResetPassword = () => {
   
        const navigate = useNavigate();
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token")
        const email = searchParams.get("email")
        const[responseMsg, setResponseMsg] = useState("")


        useEffect(() => {
            validateToken();
        }, []);
    
        const validateToken = async () => {
            try {
                const res = await axios.get('https://url-shortener-backend-cu3r.onrender.com/api/user/allusers');
                const reqUser = res.data.find(user => user.email === email);
                if (!reqUser || reqUser.randomString !== token) {
                    navigate('/error');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const initialValues = { password: '', confirmPassword: '' };

        const validationSchema = Yup.object({
            password: Yup.string().min(8).required("Password is required"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
                .min(8).required("Confirm password is required")
        });
    
        const onSubmit = async (values) => {
            try {
                const res = await axios.put('https://url-shortener-backend-cu3r.onrender.com/api/user/resetpassword', { ...values, email });
                setResponseMsg(res.data.message);
                toast.success(res.data.message);
                navigate('/login');
            } catch (error) {
                console.error(error);
                setResponseMsg(error.response.data.message);
                toast.error(error.response.data.message);
            }
        };
    
        const formik = useFormik({
            initialValues,
            validationSchema,
            onSubmit,
        });

    return (
        <div className='container'>
            <div class='forms-container'>
                <div class="signin-signup">

                    <form
                        class="sign-in-form"
                        onSubmit={formik.handleSubmit}
                    >
                        <h2 class="title">Reset Password</h2>
                        <div className="input-field">
                            <i class="fas fa-lock"></i>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter New password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                               {formik.touched.password && formik.errors.password && (
                                <span className='text-danger'>{formik.errors.password}</span>
                            )}
                        </div>
                        <div className='input-field'>
                            <i className='fas fa-lock'></i>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmPassword'
                                placeholder='Confirm password'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <span className='text-danger'>{formik.errors.confirmPassword}</span>
                            )}
                        </div>
                        <button type='submit' className='btn-success btn'>Set Password</button>
                    </form>
                </div>
                <div className='panels-container'>
                    <div className='panel left-panel'>
                        <div className='content'>
                            <h3>Set Password</h3>
                            <p>
                                Set a new password for your account. Choose a strong and unique password to ensure the security of your account.
                            </p>
                            <Link to='/login' className='btn transparent'>Sign in</Link>
                        </div>
                        <img src='/reset.svg' className='image' alt='' />
                    </div>
                </div>
            </div>
            <ToastContainer />
            </div>
    );
};

export default ResetPassword;