import React from "react";

export default function AddPost({postFunction}) {
// export default function AddPost() {
    return (
        <div className="add-post">
            <form onSubmit={e => postFunction(e)}>
                <label htmlFor="postTitle">Post Title</label>
                <section className="wrap-input100">
                    <input type="text" name="postTitle" placeholder="Post Title" />
                </section>
                <br/>

                <label htmlFor="postText">Post Text</label>
                <section className="wrap-input100">
                    <input type="text" name="postText" placeholder="Write your text here"/>
                </section>
                <br/>

                <button className="btn form-btn">Send Post</button>
            </form>
        </div>
    );
}