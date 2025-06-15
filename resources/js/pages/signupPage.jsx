import React from 'react';
import '../../css/auth.css';
import {Link} from 'react-router-dom';
import GoogleButton from '../components/button/googleButton.jsx'
import InputTextAuth from '../components/input/inputTextAuth.jsx'
import ButtonLoginSignup from '../components/button/buttonLoginSignup.jsx'

const SignupPage = () => {
  return (
    <div className="authContainer">
      <div className="form-container">
        <p className="title">Create an account</p>
        <form className="form">
            <InputTextAuth type="text" placeholder="Name" />
            <InputTextAuth type="email" placeholder="Email" />
            <InputTextAuth type="password" placeholder="Password" />
          <ButtonLoginSignup
            label="Sign up"
          />
        </form>
        <p className="log-in-label">
          Don't have an account?<Link to="/login" className="log-in-link">Log in</Link>
        </p>
        <div className="buttons-container">
            <GoogleButton />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
