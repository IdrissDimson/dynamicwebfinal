import React from "react";

export default function CreateAccountForm({ signupFunction }) {
    return (
        <div>
            <form onSubmit={e => signupFunction(e)}>
                <label htmlFor="createEmail">Email</label>
                <input type="email" name="createEmail" placeholder="email" />
                <label htmlFor="createPassword">Password</label>
                <input type="password" name="createPassword"/>
                <button>Sign Up</button>
            </form>
        </div>
    );
}