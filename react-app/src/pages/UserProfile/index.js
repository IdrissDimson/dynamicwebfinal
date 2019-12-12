import React from "react";
import { UserInformation } from "../../components/UserProfileComponent";

export default function UserProfile({ user }) {
    if (user !== null) {
        return (
            <div>
                <h1>UserProfile for {user.uid && user.uid}</h1>
                <UserInformation email={user.email ? user.email : "Error!"}/>
            </div>
        );
    } else {
        return (
            <div>
                Please log in!
            </div>
        )
    }
}