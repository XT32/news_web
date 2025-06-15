import React from 'react'
import { Link } from 'react-router-dom';
import '../../css/auth.css'
import GoogleButton from '../components/button/googleButton.jsx'
import InputTextAuth from '../components/input/inputTextAuth.jsx'
import ButtonLoginSignup from '../components/button/buttonLoginSignup.jsx'
import { FaArrowLeft} from 'react-icons/fa';

const ForgotPassword = () => {
  return (
    <div className="authContainer">
      <div className="form-container">
        <div className="forgotTitle">
            <Link to="/login"><FaArrowLeft /></Link>
            <p>Forgot Password</p>
        </div>
        <form className="form">
            <label><p className='forgotPasswordText'>Create new password</p></label>
            <InputTextAuth type="password" placeholder="enter new password" />
            <InputTextAuth type="password" placeholder="confirm new password" />
          <ButtonLoginSignup
            label="Send"
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
  )
}

export default ForgotPassword
