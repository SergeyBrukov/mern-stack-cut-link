import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

interface IAuthForm {
  email: string;
  password: string;
}
const RegisterPage = () => {
  const schemaValidateAuthForm = yup.object({
    email: yup.string().required('This input is required').email('You must write  format email'),
    password: yup.string().required('This input is required').min(3, 'Value must be more 6 symbol'),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IAuthForm>({ resolver: yupResolver(schemaValidateAuthForm) });

  const handleAuthForm: SubmitHandler<IAuthForm> = async (data) => {
    console.log(data);
    try {
      const { data: dataRes } = await axios.post('/api/auth/register', data);
      console.log(dataRes);
    } catch (error: any) {
      console.log(error.response.data.errors);
      const serverErrors = error.response.data.errors;
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
                <button className="btn grey lighten-1 black-text">Registration</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
