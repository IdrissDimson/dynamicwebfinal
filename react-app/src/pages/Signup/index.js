import React from "react";
import CreateAccountForm from '../../components/CreateAccountForm';

export default function Signup({ signupFunction }){
    return (
        <div className="login-form">
            <h1>Sign Up</h1>
            <CreateAccountForm signupFunction={signupFunction} />
        </div>
    );
};