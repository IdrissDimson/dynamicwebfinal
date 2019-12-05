import React from "react";
import CreateAccountForm from '../../components/CreateAccountForm';

export default function Signup({ signupFunction }){
    return (
        <div>
            <div>Sign Up</div>
            <CreateAccountForm signupFunction={signupFunction} />
        </div>
    );
};