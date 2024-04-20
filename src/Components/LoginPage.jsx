import React, { useState } from 'react';
import checkAuthentication from '../services/authService'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../redux/loginslice';
import './login.css';
import Notification from './Notification';
function LoginPage() {
  const [message, setMessage] = useState();
  const [notificationClass, setNotificationClass] = useState();
    const [formData, setFormData] = useState({
        name: '',
        password: ''
        });
        
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For redirecting
 
const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prevState => ({ ...prevState, [name]: value }));
};

const handleForgotPassword = () => {
console.log('Navigate to forgot password page');
// Here, add your logic for handling password reset
};

const handleForgotUsername = () => {
console.log('Navigate to forgot username page');
// Here, add your logic for handling username retrieval
};


// Refactored to handle async authentication result properly
const handleSubmit = async (e) => {
e.preventDefault();
const newErrors = findFormErrors();

if (Object.keys(newErrors).length === 0) {
try {
  const authResult = await checkAuthentication(formData.name, formData.password);
    if (authResult && authResult.message === "Authentication successful") {
        dispatch(loginSuccess(authResult)); 
        navigate('/profile'); 
  } else {
        setErrors({ ...errors, message: authResult.message });
      dispatch(loginFailure(authResult.message)); 
      setMessage(authResult.message);
      setNotificationClass("notificationerror");
  }
} catch (err) {
  console.error("Authentication error:", err);
    setErrors({ ...errors, message: "Failed to authenticate" });
    setMessage("Failed to authenticate");
    setNotificationClass("notificationerror");
    dispatch(loginFailure("Failed to authenticate")); 
}
} else {
setErrors(newErrors);
}
};


const findFormErrors = () => {
const { name, password } = formData;
const newErrors = {};

if (!name || name === '') newErrors.name = 'Name cannot be blank!';
if (!password || password === '') newErrors.password = 'Password cannot be blank!';
return newErrors;
};
    
     const resetNotification = () => {
      setMessage("");
      setNotificationClass("");
  };

return (
<div className="container">
<div className='login-side-left'>
</div>
    <div className='login-main'>
    {message && <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />}
    <form id="form-container-id" className="form-container" onSubmit={handleSubmit}>
    <h4 className='header'>Login</h4>
      <div className='login-div'>
        <div className='label-div'>
          <label className="form-label">User Name * </label>
        </div>
        <div className="error-div" >
          <input className="form-input"
            type="text"
            name="name"
            placeholder="Username"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
      </div>
      <div className='login-div'>
        <div className='label-div'>
          <label className="form-label">Password *</label>
        </div>
        <div className='error-div'>
          <input className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
      </div>
  

      <div className='login-div'>
        <button type="button" className="forgot-button" onClick={handleForgotUsername}>Forgot Username</button>
        <button type="button" className="forgot-button" onClick={handleForgotPassword}>Forgot Password</button>
      </div>

      <button type="submit" className="login-button">Login</button>
    </form>
        </div>
        <div className='login-side-right'>
        </div>
  </div>
);
}

export default LoginPage;
