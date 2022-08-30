import React from "react";

const Guest = (props) => {
    return(
        <>
            {
                !localStorage.getItem('auth_token')
                ?
                props.children
                :
                props.warn 
                &&
                (
                    <div className="alert alert-success">You are logged in</div>
                )
            }
        </>
    );
}

export default Guest;