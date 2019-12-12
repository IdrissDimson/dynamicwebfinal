import React from "react";

export default function CreateAccountForm({ signupFunction }) {
    return (
        <div>
            <form className="form" onSubmit={e => signupFunction(e)}>
                <label htmlFor="createName">Full Name</label>
                <section className="wrap-input100">
                    <input type="text" name="createName" placeholder="Jane Doe" />
                    <span className="focus-input100"></span>
                </section>

                <label htmlFor="createEmail">Email</label>
                <section className="wrap-input100">
                    <input type="text" name="createEmail" placeholder="user@email.com" />
                    <span className="focus-input100"></span>
                </section>
                <br/>

                <label htmlFor="createPassword">Password</label>
                <section className="wrap-input100">
                    <input type="password" name="createPassword" placeholder="password"/>
                    <span className="focus-input100"></span>
                </section>
                <br/>

                <button className="btn form-btn">Sign Up</button>
            </form>
        </div>
    );
}