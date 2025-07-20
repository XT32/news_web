import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import '../../../css/auth.css';

const LoginPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <div className="authContainer">
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={submit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                required
                className="input"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                required
                className="input"
            />
          <p className="page-link">
            <Link href={route('password.request')} className="page-link-label">Forgot Password?</Link>
          </p>
          <button type="submit" className="btn-login" disabled={processing}>
            Log in
          </button>
          {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
          {errors.password && <div className="text-red-500 text-xs mt-2">{errors.password}</div>}
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <Link href={route('register')} className="sign-up-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
