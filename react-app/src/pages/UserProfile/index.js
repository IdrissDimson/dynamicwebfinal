import React from "react";
import UserInformation from "../../components/UserProfileComponent";

export default function UserProfile({ user }) {
    console.log("user", user);
    return (
        <div>
            <h1>UserProfile for {user.uid && user.uid}</h1>
            <UserInformation email={user.email ? user.email : "Error!"}/>
        </div>
    );
}