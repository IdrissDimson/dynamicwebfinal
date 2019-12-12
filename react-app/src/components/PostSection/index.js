import React from "react";

export default function PostSection({ title, text }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}