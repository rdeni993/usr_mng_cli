import React from "react";
import {createRoot} from "react-dom/client";
import Protected from "./components/Protected";
import Guest from "./components/Guest";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./pages/List";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Permissions from "./pages/Permissions";

import axios from "axios";

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
};

/**
 * Main App Component
*/
const App = () => {

      /**
       * Remove Auth
       */
      const logout = () => {
        localStorage.removeItem('auth_token');
        window.location.href="/login"
      }

      return(

        <div className="container-fluid p-0 my-5"> 

            <div className="container">
                {/** Header */}
                <img src={logo} alt="logo" className="logo-image" />
                <h1 className="mt-2 text-shadow">Mistral Test Example</h1>
                {/** EOF Header */}
            </div>

            {/** Page */}
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="col-lg-3">
                        <ul className="list-group text-start border">
            
                            <Guest>

                                <li className="list-group-item border-0">
                                    <a className="btn btn-danger form-control text-start" href="/create">Signup</a>
                                </li>

                                <li className="list-group-item border-0">
                                    <a className="btn btn-link" href="/login">Login</a>
                                </li>

                            </Guest>

                            <Protected>
                                <li className="list-group-item border-0">
                                    <a className="btn btn-danger form-control text-start" href="/create">Create New User</a>
                                </li>

                                <li className="list-group-item border-0">
                                    <a className="btn btn-link" href="/list">List All Users</a>
                                </li>
                                
                                <li className="list-group-item border-0">
                                    <a className="btn btn-link" href="#" onClick={() => { logout(); }}>Logout</a>
                                </li>
                            </Protected>

                        </ul>
                    </div>
                    <div className="col-lg-8 ms-auto">

                        {/**
                         * 
                         * Application Content
                         * 
                         */}

                        <BrowserRouter>
                            <Routes>

                                  <Route path="/login" element={<Login />} />
                                  <Route path="/list" element={<List />} />
                                  <Route path="/" element={<List />} />
                                  <Route path="/create" element={<Signup />} />
                                  <Route path="/user/:id" element={<Profile />} />
                                  <Route path="/user/edit/:id" element={<Edit />} />
                                  <Route path="/user/permissions/:username/:id" element={<Permissions />} />

                            </Routes>
                        </BrowserRouter>    

                         {/**
                          * 
                          * EOF App Content
                          * 
                          */}

                    </div>
                </div>
            </div>
            {/** EOF Page */}
        </div>

      );
}

/**
 * Render Application
 */
const root = createRoot(document.getElementById("root"));
root.render(<App></App>);