import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './index.css';
import 'react-quill/dist/quill.snow.css'; 
import { setCurrentPDF, setFileName } from '../redux/mocktestslice';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import ViewLatestUploads from './ViewLatestUploads';
import { setFileDetails } from '../redux/mocktestslice';

function FileUploadMain() {
  const [filenametext, setFileNameText] = useState("");
  const [message, setMessage] = useState("");
  const [notificationClass, setNotificationClass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const url = useSelector((state) => state.mocktest.data);
   
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.type !== 'application/pdf') {
          setMessage("Unsupported file type. Please upload a PDF file.");
          setNotificationClass("notificationerror");
          return;
      }
  
        const formData = new FormData();
        formData.append('pdf', file); 
        if (filenametext) {
          formData.append('details', filenametext);
         }
        fetch("http://localhost:3001/filepdfupload", {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
          .then(data => {
            console.log("filename"+data.filename);
            dispatch(setFileName(data));
            dispatch(setFileDetails(data));
              navigate('/fileupload');      
        })
        .catch((error) => {
          console.error('Error:', error);
          setMessage("Upload failed!");
          setNotificationClass("notificationerror");
        });
      };

      const fetchOldFile = () => 
      {
        dispatch(setCurrentPDF({ currentPage: 1 }));
        navigate('/fileupload');
      }
  
      const resetNotification = () => {
        setMessage("");
        setNotificationClass("");
      };
  
    return (
      <>
        {message && <Notification message={message} notificationclass={notificationClass}  onDismiss={resetNotification}/>}
        <h1>File Upload</h1>  {url && <button className="prevfilebutton" type="button" onClick={fetchOldFile}>Click to view previous file</button>}
        <form method="post" className="form-file-data">
          <input className= "file-input" placeholder= "Enter description" maxLength={50} type="text" value={filenametext} onChange = {(e) => setFileNameText( e.target.value )} />
          <input className= "file-input" type="file" name="pdf" onChange={handleFileChange} accept="pdf/*"/>
        </form>  
        <hr></hr>
        <ViewLatestUploads />
      </>
    )
}

export default FileUploadMain;