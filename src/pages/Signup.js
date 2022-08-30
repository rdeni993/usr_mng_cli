import React, { useRef } from "react";
import { useState } from "react";
import {baseUrl} from "../components/UrlHandler";
import axios from "axios";

const Signup = () => {

    const firstName= useRef(false);
    const lastName = useRef(false);
    const email    = useRef(false);
    const username = useRef(false);
    const password = useRef(false);

    const [signUpError, setSignUpError] = useState({
        status : false,
        message : ""
    });

    const doSignup = (event) => {

        // Prevent Form Submit
        event.preventDefault();

        const fData = new FormData();

        fData.append('first_name', firstName.current.value);
        fData.append('last_name', lastName.current.value);
        fData.append('email', email.current.value);
        fData.append('username', username.current.value);
        fData.append('password', password.current.value);

        axios({
            method : "POST",
            data : fData,
            url : baseUrl('/api/signup')
        })
        .then( 
            (response)  =>  {
                alert("User is Successfully Created!");
                setSignUpError({status : false, message : ""})
                event.target.reset();
            }
        )
        .catch(
            (error) => {

                console.log(error.response.data[0])
                // This will catch Error
                // from server. If it is 406 it mean we have
                // data not acceptable
                if( error.response.status == 406 ){

                    let tempMessage = [];

                    Object.keys(error.response.data[0]).map((key)=>{
                        tempMessage.push(error.response.data[0][key]);
                    });

                    setSignUpError({
                        status : true,
                        message : tempMessage
                    });

                }
            }
        );

    }

    return(
        <div className="card w-50 float-end">

            {
                signUpError.status 
                &&
                <div className="card-footer p-3 text-danger text-start">
                    {
                        signUpError.message.map( (mes, index) => {
                            return(
                                <p key={index}>{mes}</p>
                            ); 
                        })
                    }
                </div>
            }

            <div className="card-body text-start">
                <form onSubmit={ doSignup }>

                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input type="text" ref={firstName} className="form-control" placeholder="eg. John" required />
                    </div> 

                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input type="text" ref={lastName} className="form-control" placeholder="eg. Doe" required />
                    </div> 

                    <div className="form-group mt-3">
                        <label>E-mail</label>
                        <input type="email" ref={email} className="form-control" placeholder="eg. john@doe.com" required  />
                    </div> 

                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input type="text" ref={username} className="form-control" placeholder="eg. johndoe123" required />
                    </div>           
                    
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input type="password" ref={password} className="form-control" placeholder="eg. *****" required />
                    </div>           
                    
                    <div className="form-group mt-3">
                        <button className="btn btn-primary float-end">
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;