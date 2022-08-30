import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../components/UrlHandler";
import Guest from "../components/Guest";

const Login = () => {

    const username = useRef(false);
    const password = useRef(false);

    const [loginError, setLoginError] = useState({
        status : false,
        message : ""
    });

    const doLogin = (event) => {
        
        event.preventDefault();

        const fData = new FormData();

        fData.append('username', username.current.value);
        fData.append('password', password.current.value);

        axios({

            method : "POST",
            data : fData,
            url : baseUrl('/api/login')

        })
        .then(
            (response) => {
                localStorage.setItem('auth_token', response.data.token);
                window.location.reload();
            }
        )
        .catch( 
            (error) => {
                setLoginError({
                    status : true,
                    message : "We do not have user with this credentials"
                });
            }
        );

    }

    return(
        <Guest warn={true}>
            <div className="card w-50 float-end">
                {
                    loginError.status 
                    &&
                    <div className="card-footer p-3 text-danger text-start">
                        { loginError.message }
                    </div>
                }
                <div className="card-body text-start">
                    <form onSubmit={doLogin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" ref={username} className="form-control" placeholder="eg. johndoe123" required />
                        </div>           
                        
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input type="password" ref={password} className="form-control" placeholder="eg. *****" required />
                        </div>           
                        
                        <div className="form-group mt-3">
                            <button className="btn btn-primary float-end">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Guest>
    );
}

export default Login;