import React from "react";

export default function LoginForm({ loginFunction }) {
    return (
        <div>
            <form className="form" onSubmit={e => loginFunction(e)}>
                <label htmlFor="loginEmail">Email: </label>
                <section className="wrap-input100">
                    <input type="text" name="loginEmail" placeholder="user@email.com" />
                    <span className="focus-input100"></span>
                </section>
                <br/>

                <label htmlFor="loginPassword">Password: </label>
                <section className="wrap-input100">
                    <input type="password" name="loginPassword" placeholder="password"/>
                    <span className="focus-input100"></span>
                </section>

                <br/>
                <button className="btn form-btn">Log In</button>
            </form>
        </div>
    );
}