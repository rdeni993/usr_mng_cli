import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";

import { baseUrl } from '../components/UrlHandler';

const Permissions = () => {

    const args = useParams();
    const [userData, setUserData] = useState([]);
    const [codePermission, setCodePermission] = useState(false);
    const [descriptionPermission, setDescriptionPermission] = useState(false);

    const fetchAPI = async () => {
        axios({
            url     :   baseUrl(`/api/permission/${args.id}`),
            method  :   "GET"
        }).then((response) => {

            response.data.data.map((p, i) => {
                switch(p.pname.toLowerCase()){

                    case 'code' : { console.log("Tadaaa"); setCodePermission(true); } break;
                    case 'description' : { console.log("aadaT"); setDescriptionPermission(true); }break;

                }
            });

        });
    }

    const handleCheckBox = (e, permissionId) => {
        if( e.target.checked ){
            if(window.confirm("Are You sure you want add Permission")){
                axios.post(baseUrl(`/api/permission/${args.id}/${permissionId}`))
                .then(
                    (response) => {
                        if( response.status == 200 ){
                            if( permissionId == 1 ){
                                setCodePermission(true)
                            } 
                            if( permissionId == 2 ){
                                setDescriptionPermission(true)
                            }

                            alert("User Permission is added");
                        }
                    }
                ).catch(
                    (error) => {
                        alert("User Permission is not updated!");
                    }
                )
            }
        } else {
            if(window.confirm("Are You sure you want remove Permission")){
                axios.delete(baseUrl(`/api/permission/${args.id}/${permissionId}`))
                .then(
                    (response)  =>  {
                        if( response.status == 200 ){
                            if( permissionId == 1 ){
                                setCodePermission(false)
                            } 
                            if( permissionId == 2 ){
                                setDescriptionPermission(false)
                            }

                            alert("User Permission is removed!");
                        }
                    }
                ).catch(
                    (error) => {
                        alert("User Permission is not updated!");
                    }
                )
            }
        }
    }   

    useEffect(()=>{
        fetchAPI();
    }, []);

    return(
        <div className="card">
            <div className="card-body">
                
                <h4>Permission settings for: {args.username}</h4>

                <div className='form-data'>
                    <input type="checkbox" className='me-3' checked={codePermission} onChange={ (e) =>{ handleCheckBox(e, 1) } } />
                    Code
                </div>

                <div className='form-data'>
                    <input type="checkbox" className='me-3' onChange={ (e) =>{  handleCheckBox(e, 2) } } checked={descriptionPermission} />
                    Description
                </div>
            </div>
        </div>
    );
}

export default Permissions;