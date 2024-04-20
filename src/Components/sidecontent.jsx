import React from "react";
import { Link } from 'react-router-dom';
import './index.css'
function SideContent() {
    return (
        <div className="sidecontent">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                <Link to="/fileuploadmain">File Upload</Link>
                </li>
                <li><Link to="/mocktest">Create Mock Test</Link></li>
                <li><Link to="/startmocktest">Start Mock Test</Link></li>
                <li><Link to="/timetable">Time Table</Link></li>
                <li><Link to="/profile">Profile</Link></li>
         </ul>
        </div>
    );
}

export default SideContent;