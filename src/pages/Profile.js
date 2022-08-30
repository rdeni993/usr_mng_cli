import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from '../components/UrlHandler';

const Profile = (props) => {

    // Take Params
    const args = useParams();
    const [user, setUser] = useState({
        status : "loading",
        user : {}
    });

    const [permissions, setPermissions] = useState([]);

    const fetchPermissions = async() =>{
        const response = await axios({
            url: baseUrl(`/api/permission/${args.id}`),
            method : "GET"
        });

        console.log(response.data.data)
        setPermissions(response.data.data)
    }

    useEffect(()=>{

        axios({
            method : "GET",
            url : baseUrl(`/api/user/${args.id}`)
        })
        .then( (response) => {
            if( response.status == 200 && response.data ){

                setUser({
                    status : "complete",
                    data : response.data.data
                });

                fetchPermissions();
            }
        })
        .catch( (error) => {
            if( error.response.status ){
                setUser(
                    {
                        status : "error",
                        error : "There is no user"
                    }
                );
            }
        });

    }, []);

    return(
        <>
            {
                (user.status == 'loading')
                ?
                <div className='card border-0'>
                    <div className='card-body p-0 m-0'>
                        <h3>Loading</h3>
                    </div>
                </div>
                :
                    (user.status == 'complete')
                    ?
                    <div className='card border-0 p-0 m-0'>
                        <div className='card-body p-0 m-0'>
                            <h4>User profile: { `
                                ${user.data.first_name} 
                                ${user.data.last_name} 
                                ( ${user.data.username} )
                            `}</h4>
                            <p className='text-secondary'>{ user.data.email }</p>

                            <h6>Status</h6>
                            <p className='text-dark'>{ user.data.status || 'No status' }</p>
                            <hr/>
                            <h5>Permissions</h5>
                            {
                                permissions.map( (per, index) => {
                                    return(
                                        <div className='form-data' key={index}>
                                            <input type="checkbox" className='me-3' checked readOnly/> {per.pname} 
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className='card border-0'>
                        <div className='card-body p-0 m-0'>
                            <h4>User with id {args.id} not found!</h4>
                            <p>{user.error}</p>
                        </div>
                    </div>

            }
        </>
    );
}

export default Profile;