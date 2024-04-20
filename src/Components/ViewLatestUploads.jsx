import React from "react";
import './index.css';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setFileName } from '../redux/mocktestslice';
function ViewLatestUploads() {
    const details = useSelector((state) => state.mocktest.fileDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (url) => {
        const data =  details.find((element) => element.url === url);
        dispatch(setFileName(data));
        navigate('/fileupload');  
    };

    return (
        <div className="latest-files">
            <h3>View Latest Uploads</h3>
            <hr />
            <ul>
                {details && details.length > 0 ? (
                    details.map((data, index) => <li onClick={()=> handleClick(data.url)} key={data.url}>{data.details || data.filename}</li>)
                ) : (
                    <p className="empty-message">No files uploaded yet.</p>
                )}
            </ul>
        </div>
    );
}
export default ViewLatestUploads;