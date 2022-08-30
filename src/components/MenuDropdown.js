import { Dropdown } from "react-bootstrap"
import {
    BsFillGearFill
} from "react-icons/bs";
import { baseUrl } from "./UrlHandler";
import axios from "axios";

const remove = async (userId, setTableData, tableData) => {
    if(window.confirm("Are you sure you want delete this user? This action cannot be undone!")){
        const response = await axios({
            method : "DELETE",
            url : baseUrl(`/api/user/${userId}`)
        });
    
        if(response.status == 200){
           setTableData(
                tableData.filter( item => item.id !== userId )
           )

           alert("User is removed!")
        }
    
        if(response.error){
            alert("User Cannot be deleted");
        }
    }
} 

const MenuDropdown = (props) => {
    return <Dropdown>
        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            <BsFillGearFill />
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href={`/user/${props.user}`}>Open</Dropdown.Item>
            <Dropdown.Item href={`/user/edit/${props.user}`}>Edit</Dropdown.Item>
            <Dropdown.Item href={`/user/permissions/${props.username}/${props.user}`}>Permissions</Dropdown.Item>

            <Dropdown.Item onClick={
                ()=>{
                    remove(
                        props.user, 
                        props.updateTable, 
                        props.currentTable
                    )
                    }} 
            className="text-danger">Remove</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
}

export default MenuDropdown;