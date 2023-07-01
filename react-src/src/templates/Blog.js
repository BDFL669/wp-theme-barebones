import React from "react";
import TheLoop from "../partials/TheLoop";
import Pager from "../partials/Pager";
import { Provider } from "../context/Context";
const Blog = (props) => {
    return (
        <div>
             <Provider router={props}>
        <div>
            <h1>Blog</h1>
            <TheLoop></TheLoop>
            <Pager></Pager>
        </div>
        </Provider>
        </div>
    );
}

export default Blog;