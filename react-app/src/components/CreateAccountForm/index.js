import React from "react";

export default function CreateAccountForm({ signupFunction }) {
    return (
        <div>
            <form onSubmit={e => signupFunction(e)}>
                <label htmlFor="createEmail">Email</label>
                <section className="wrap-input100">
                    <input type="text" name="createEmail" placeholder="user@email.com" />
                    <span class="focus-input100"></span>
                </section>
                <br/>

                <label htmlFor="createPassword">Password</label>
                <section className="wrap-input100">
                    <input type="password" name="createPassword" placeholder="password"/>
                    <span class="focus-input100"></span>
                </section>
                <br/>

                <button class="btn form-btn">Sign Up</button>
            </form>
        </div>
    );
}