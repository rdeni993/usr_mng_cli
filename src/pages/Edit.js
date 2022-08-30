import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { baseUrl } from '../components/UrlHandler';

const Edit = (props) => {

    // Use ID from URL
    const args = useParams();
    const [userData, setUserData] = useState({});
    const firstName = useRef(null);
    const lastName  = useRef(null);
    const email     = useRef(null);
    const status    = useRef(null);    

    const fetchAPI = async () => {
        let response = await axios({
            url     :   baseUrl(`/api/user/${args.id}`),
            method  :   "GET"
        });

        setUserData(response.data.data);
    }

    const saveData = () => {
        if(window.confirm("Are You sure you want make changes?")){
            axios.patch(
                baseUrl(`/api/user/${args.id}`),
                {
                    'first_name'    :   firstName.current.value,
                    'last_name'     :   lastName.current.value,
                    'status'        :   status.current.value,
                    'email'         :   email.current.value
                }
            ).then( (response) => {
                if( response.status === 200 ){
                    alert("Changes are saved!");
                } 
            }).catch((error) => {
                alert("Changes are not saved!");
                console.log(error);
            });
        }
    }

    useEffect(()=>{
        fetchAPI();
    }, []);


    return(
        <div className="card">
            <div className='card-body'>
            
                <h4>Update Profile for: {userData.username}</h4>
                <hr/>
                <br/>

                <div className='form-group'>
                    <label>Set Name</label>
                    <input type="text" className='form-control' ref={firstName} defaultValue={userData.first_name} />
                </div>

                <div className='form-group mt-3'>
                    <label>Set SurName</label>
                    <input type="text" className='form-control' ref={lastName} defaultValue={userData.last_name} />
                </div>

                <div className='form-group mt-3'>
                    <label>Set Email</label>
                    <input type="email" className='form-control' ref={email} defaultValue={userData.email} />
                </div>

                <div className='form-group mt-3'>
                    <label>Set Status</label>
                    <input type="text" className='form-control' ref={status} defaultValue={userData.status} />
                </div>

                <div className='form-group mt-3 text-end'>
                    <button className='btn btn-success' onClick={saveData}>Save</button>
                </div>

            </div>
        </div>
    );
}

export default Edit;