import React from "react";

export default function UserProfileComponent({ email }) {
    return (
        <div>
            <p>Logged in user email is {email}</p>
        </div>
    );
}