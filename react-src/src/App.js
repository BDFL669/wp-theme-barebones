import React from "react";
import {
    createBrowserRouter, 
    createRoutesFromElements,
    Route, 
    RouterProvider
  } from 'react-router-dom';
import Home from "./templates/Home";
import "./App.css";
import About from "./templates/About";
import Blog from "./templates/Blog";
import RootLayout from "./partials/RootLayout";
import NotFound from "./templates/NotFound";
import Login from "./templates/Login";
import SinglePost from "./templates/SinglePost";
import Dashboard from "./templates/Dashboard";
import PrivateRoutes from "./partials/ProtectedRoutes";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/wordpress" element={<RootLayout />}>
        <Route path="/wordpress" index element={<Home />} />
        <Route path="/wordpress/about" element={<About />} />  
        <Route path="/wordpress/blog" element={<Blog />} />
        <Route path="/wordpress/signin" element={<Login />} />
        <Route element={<PrivateRoutes />}>
        <Route path="/wordpress/dashboard/:slug" element={<Dashboard />} />
        </Route>
        <Route path="/wordpress/:slug" element={<SinglePost />} />
        <Route path="/wordpress/*" element={<NotFound />} />
        </Route>
    )
  )
function App() {
    return (
        <RouterProvider router={router} />
        
    );
}

export default App;
