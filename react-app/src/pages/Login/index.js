import React from "react";
import LoginForm from "../../components/LoginForm";

export default function Login({ loginFunction }) {
    return (
        <div className="login-form">
            <h1>Log In</h1>
            <LoginForm loginFunction={loginFunction}/>
        </div>
    );
}