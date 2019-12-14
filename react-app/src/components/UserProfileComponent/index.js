import React from "react";

export function UserInformation({ email }) {
    return (
        <div className="center">
            <p>Logged in user email is {email}</p>
        </div>
    );
}