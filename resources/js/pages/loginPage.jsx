import React from 'react';
import '../../css/auth.css';
import {Link} from 'react-router-dom';
import GoogleButton from '../components/button/googleButton.jsx'
import InputTextAuth from '../components/input/inputTextAuth.jsx'
import ButtonLoginSignup from '../components/button/buttonLoginSignup.jsx'

const LoginPage = () => {
  return (
    <div className="authContainer">
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form">
            <InputTextAuth type="email" placeholder="Email" />
            <InputTextAuth type="password" placeholder="Password" />
          <p className="page-link">
            <Link to="/forgotPassword" className="page-link-label">Forgot Password?</Link>
          </p>
          <ButtonLoginSignup
            label="Log in"
          />
        </form>
        <p className="sign-up-label">
          Don't have an account?<Link to="/signup" className="sign-up-link">Sign up</Link>
        </p>
        <div className="buttons-container">
            <GoogleButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
