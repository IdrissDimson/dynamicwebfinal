import React from "react";

export default function AddPost({postFunction}) {
// export default function AddPost() {
    return (
        <div className="add-post">
            <form onSubmit={e => postFunction(e)}>
            {/* <form> */}
                <label htmlFor="postTitle">Post Title</label>
                <input type="text" name="postTitle" placeholder="Post Title" />
                <br/>

                <label htmlFor="postText">Post Text</label>
                <input type="text" name="postText" placeholder="Write your text here"/>
                <br/>

                <button className="btn form-btn">Send Post</button>
            </form>
        </div>
    );
}