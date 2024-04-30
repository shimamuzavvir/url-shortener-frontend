import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup'
import './Style/form.css'

const ForgetPassword = () => {
    const [responseMsg, setResponseMsg] = useState("")
    const navigate = useNavigate()

    const initialValues = { email: " " }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address').required('Email is Required'),


    })

    const onSubmit = async (values) => {
        try {
            const res = await axios.post('https://url-shortener-backend-cu3r.onrender.com/api/user/forgetpassword', values);
            setResponseMsg(res.data.message)
            toast.success(res.data.message)

        } catch (error) {
            console.log(error);
            setResponseMsg(error.response.data.message)
            toast.error(error.response.data.message)
            navigate('/login')

        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return (
        <div className='container'>
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={formik.handleSubmit} className='sign-in'>
                        <h2 className="title">Forget Password</h2>
                        <div className="input-field">
                            <i className='fas fa-user'></i>
                            <input type="email" className='form-control' id='email' aria-describedby='emailHelp' required value={formik.values.email} onChange={formik.handleChange} placeholder='Enter your email ' />
                            <div className="error">
                                <span className='text-danger'>{formik.errors.email}</span>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <p class="social-text">Or Reset Password with social platforms</p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
                <div className='panels-container'>
                    <div className='panel left-panel'>
                        <div class='content'>
                            <h3>Forgot Password?</h3>
                            <p>
                                Enter your email-id to reset your password. We'll send you a password reset link to your email.
                            </p>
                            <div class="d-flex justify-content-evenly">
                                <Link to='/login'><button className='btn transparent' id='sign-in-btn'>Login</button></Link>
                                <Link to='/'><button className='btn transparent' id='sign-up-btn'>SignUp</button></Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgetPassword;