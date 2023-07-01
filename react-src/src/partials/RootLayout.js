import React from "react";
import {
    NavLink, 
    Outlet
} from "react-router-dom";
import Footer from "./Footer";

const RootLayout = () => {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1 className="logo">lowacase</h1>
                    <NavLink to="/wordpress">Home</NavLink>
                    <NavLink to="/wordpress/about">About</NavLink>
                    <NavLink to="/wordpress/blog">Blog</NavLink>
                    <NavLink to="/wordpress/signin">Login</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
                <Footer />
            </main>
        </div>
    );
}

export default RootLayout;