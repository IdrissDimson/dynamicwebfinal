import React from "react";

export default function PostSection({ title, text, author, monkey}) {
    // console.log("yeet", monkey.urls.full);
    return (
        <div>
            <h2>{title} <img className="monkey-pic" src={monkey.urls.full} alt={monkey.alt_description}/></h2>
            <h3>by {author} </h3>
            <p>{text} </p>
            {/*  */}
        </div>
    );
}