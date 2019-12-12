import React from "react";
import { UserInformation } from "../../components/UserProfileComponent";

export default function UserProfile({ user }) {
    return (
        <section className="profile-pic">
            <h1>User Profile for {user.uid && user.uid}</h1>
            <UserInformation email={user.email ? user.email : "Error!"}/>
        </section>
    );
}