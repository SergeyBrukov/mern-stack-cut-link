import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authHook';

interface IAuthForm {
  email: string;
  password: string;
}
const RegisterPage = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const schemaValidateAuthForm = yup.object({
    email: yup
      .string()
      .required('This input is required')
      .email('You must write somesing format email'),
    // .email('You must write somesing format email'),
    password: yup.string().required('This input is required').min(6, 'Value must be more 6 symbol'),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IAuthForm>({ resolver: yupResolver(schemaValidateAuthForm) });

  const handleAuthForm: SubmitHandler<IAuthForm> = async (data) => {
    try {
      const dataRes = await axios.post('/api/auth/login', data);

      if (dataRes.status === 200) {
        console.log(dataRes.data.token);
        login(dataRes.data.token, dataRes.data.userId);
        navigate('/create');
      }
    } catch (error: any) {
      console.log(error.response.data.errors);
      const serverErrors = error.response.data.errors;
      serverErrors &&
        serverErrors.forEach((element: { param: keyof IAuthForm; msg: string }) => {
          setError(element.param, { message: element.msg });
        });
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Cut links</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authhorized</span>
            <form onSubmit={handleSubmit(handleAuthForm)}>
              <input {...register('email')} id="email" className="validate" />
              <label htmlFor="email">Email</label>
              {errors.email && (
                <span className="helper-text" data-error="wrong" data-success="right">
                  {errors.email.message}
                </span>
              )}

              <input {...register('password')} id="password" className="validate" />
              <label htmlFor="password">Password</label>
              {errors.password && (
                <span className="helper-text" data-error="wrong" data-success="right">
                  {errors.password.message}
                </span>
              )}
              <div className="card-action">
                <button className="btn yellow darken-4" style={{ marginRight: '10px' }}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
