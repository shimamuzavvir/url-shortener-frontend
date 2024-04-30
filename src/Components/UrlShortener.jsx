import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UrlShortener = ({ email }) => {
  const [responseMsg, setResponseMsg] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();

  const initialValues = { longUrl: '' };

  const validationSchema = Yup.object({
    longUrl: Yup.string().required('Long URL is Required'),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(`https://url-shortener-backend-cu3r.onrender.com/api/user/shorturl/${email}`, values);
      setResponseMsg(res.data.message);
      setShortUrl(res.data.data);
         console.log( res.data.data);
             console.log(inputState)
      toast.success(res.data.message);
    } catch (error) {
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
    <div className="container-fluid">
      <div className="mt-5">
        <h2 className="title text-center">URL SHORTENER</h2>
        <div className="mt-5">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control w-75"
              id="longUrl"
              value={formik.values.longUrl}
              onChange={formik.handleChange}
              placeholder="Enter your longUrl"
            />
            <div className="errors">
              <span className="text-danger">{formik.errors.longUrl}</span>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-center">
          <div className="mx-4">
            <h3>Your Short Url <i className="fa-solid fa-arrow-right"></i></h3>
          </div>
          <div>
            <h3>
              <a href={`https://url-shortener-backend-cu3r.onrender.com/api/user/shortid/${shortUrl}`} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </h3>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UrlShortener;
