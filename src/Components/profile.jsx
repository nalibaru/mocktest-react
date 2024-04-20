import React from "react";
import UploadProfilePic from "./UploadProfilePic";
import './index.css';
import ProfileTable from "./ProfileTable";
function Profile() {
    return (
        <div>
            <UploadProfilePic />
            <hr></hr>
            <div>
            <ProfileTable />
            </div>
        </div>
    );
}

export default Profile;