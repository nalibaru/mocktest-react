import React,{ useEffect, useState } from "react";
import './index.css';
import kalkinImage from '../images/kalkin.jpeg';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction }  from '../redux/loginslice';
import DateTimeDisplay from "./DateTimeDisplay";
function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageData = useSelector((state) => state.profile.data);
    const isAuthenticate = useSelector((state) => state.login.isAuthenticated);
    const imageUrl = imageData?.url;
    const [imageSrc, setImageSrc] = useState(kalkinImage);
    const handleImageError= () => {
        setImageSrc(kalkinImage);
    }

    useEffect(() =>
    {
        setImageSrc(imageUrl || kalkinImage);
    }, [imageUrl])
    
    const logout = () => {
        dispatch(logoutAction());
        navigate('/login');
    }

    const login = () => {
        //dispatch(logoutAction());
        navigate('/login');
    }

    return (
        <div className="headermain">
            <div className="subheader">
            <div className="imagedetails">
                     <img src={imageSrc} alt="Kalkin Abhinav Gopa" onError={handleImageError}  />
            </div>
            <div className="headerdetails">
                <h2>Kalkin Abhinav Gopa</h2>
                <h3>Year 1</h3>
                </div>
                <DateTimeDisplay/>
            </div>
            <div className="buttondetails">
                {isAuthenticate  ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
            </div>
        </div>
    );
}

export default Header;
