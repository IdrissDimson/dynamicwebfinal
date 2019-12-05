import React from "react";

export default function LoginForm({ loginFunction }) {
    return (
        <div>
            <form onSubmit={e => loginFunction(e)}>
                <label htmlFor="loginEmail">Email</label>
                <input type="email" name="loginEmail" placeholder="email" />
                <label htmlFor="loginPassword">Password</label>
                <input type="password" name="loginPassword"/>
                <button>Log In</button>
            </form>
        </div>
    );
}