import React from "react";

export default function PostSection({ title, text, author }) {
    return (
        <div>
            <h2>{title}</h2>
            <h3>by {author} </h3>
            <p>{text}</p>
        </div>
    );
}