import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './index.css';
import TableComponent from "./TableComponent";
function ProfileTable()
{
    const navigate = useNavigate();
    const userdetails = useSelector((state) => state.login.user);
    const { firstname, lastname, address, age, education, schoolname, mothername, fathername, sibling, hobbies, aim } = userdetails || {};
    const profileInfo = {
        firstname: firstname,
        lastname: lastname,
        address: address,
        age: age,
        education: education,
        schoolname: schoolname,
        mothername: mothername,
        fathername: fathername,
        hobbies: hobbies,
        sibling: sibling,
        aim: aim
    };
    
    const handleLogin = () => {
        navigate('/login');
    }

    if (!userdetails)
    {
        return (<div style={{
            textAlign: 'center',
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#FF0000', 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: '#FFF0F0', 
            border: '1px solid #FFD0D0', 
            borderRadius: '10px', 
            maxWidth: '80%', 
            margin: '20px auto', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
            *** Sorry, Can't display the details since you are not logged in *** 
            <button onClick={handleLogin} style={{
                padding: '10px 20px', 
                fontSize: '16px', 
                cursor: 'pointer', 
                border: 'none',
                borderRadius: '5px', 
                backgroundColor: '#FF0000', 
                color: 'white', 
                fontWeight: 'bold' 
            }}>Login Here</button>
        </div>);    
    }
   
    return (
        <div>
            <h2>User details</h2>
            <hr></hr>
   <TableComponent {...profileInfo}/>
   </div>)
}
    
export default ProfileTable;
