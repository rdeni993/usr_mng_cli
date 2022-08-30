import React from "react";

const Protected = ( props ) => {
    return(
        <>
            {
                localStorage.getItem('auth_token')
                ?
                props.children
                :
                props.warn 
                &&
                (
                    <div className="alert alert-danger">You must be logged in to view this page</div>
                )
            }
        </>
    );
}

export default Protected;