import React from "react";
import '../../../css/auth.css';
import { useForm, Link } from '@inertiajs/react';
import GoogleButton from '@/Components/Button/GoogleButton.jsx';
import InputText from '@/Components/Input/InputText.jsx';
import ButtonLoginSignup from '@/Components/Button/ButtonLoginSignup.jsx';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div className="authContainer">
      <div className="form-container">
        <p className="title">Create an account</p>
        <form className="form" onSubmit={submit}>
          <InputText
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            required
          />
          {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
          <InputText
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            required
          />
          {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
          <InputText
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            required
          />
          {errors.password && <div className="text-red-500 text-xs mt-2">{errors.password}</div>}
          <InputText
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            onChange={e => setData('password_confirmation', e.target.value)}
            required
          />
          {errors.password_confirmation && <div className="text-red-500 text-xs mt-2">{errors.password_confirmation}</div>}
          <ButtonLoginSignup
            label={processing ? 'Processing...' : 'Sign up'}
            disabled={processing}
          />
        </form>
        <p className="log-in-label">
          Already have an account?
          <Link href={route('login')} className="log-in-link">Log in</Link>
        </p>
        <div className="buttons-container">
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
