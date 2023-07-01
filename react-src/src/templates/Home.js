import React from "react";
import TheHomeLoop from '../partials/TheHomeLoop';
import {Provider} from '../context/Context';
import {Link} from 'react-router-dom';
//import Pager from '../partials/Pager';

const Home = (props) => {
    return (
        <Provider router={props}>
        <div>
            <h1>Home</h1>
            <TheHomeLoop></TheHomeLoop>
            <Link to="/wordpress/blog"><button type="button">Visit Blog</button></Link>
        </div>
        </Provider>
    );
}

export default Home;