import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.css';
import 'react-quill/dist/quill.snow.css'; 
import { setImageData } from '../redux/profileslice';
import Notification from './Notification';
function UploadProfilePic() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [notificationClass, setNotificationClass] = useState("");

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage("Unsupported file type. Please upload an image.");
            setNotificationClass("notificationerror");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', file); 
      
        fetch("http://localhost:3001/upload", {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
          .then(data => {
              dispatch(setImageData(data)); 
              setMessage(data.message);
              setNotificationClass("notificationsuccess");
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage("Upload failed!");
            setNotificationClass("notificationerror");
        });
      };

    
     const resetNotification = () => {
        setMessage("");
        setNotificationClass("");
    };

    return (
        <div className="uploadpic">
            {message && <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />}
            <h1>Upload Picture</h1>         
            <form method="post" className="form-data">
                <input type="file" name="image" onChange={handleImage} accept="image/*" />
            </form>  
        </div>
    )
}

export default UploadProfilePic;