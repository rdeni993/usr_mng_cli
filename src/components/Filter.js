import { useState } from "react";

const Filter = ({tableData, setTableData}) => {

    const [field, setField] = useState('first_name');
    const [query, setQuery] = useState(null);
    const tempArr = tableData;

    const changeCond = (e) => {
        setField(e.target.value)
    }

    const changeQuery = (e) => {
        setQuery(e.target.value)

        if(e.target.value.length > 3){
            setTableData(tableData.filter( 
                (item) => {
                    return item[field].toLowerCase().includes(e.target.value.toLowerCase())
                }
            ))

        } else {
            setTableData(tableData)
            console.log(tempArr)
        }
    }

    return(
        <>   
        
            <div className="w-25 float-end mb-3">
                <div className="form-group">
                    <input type="text" className="form-control" onChange={ (e) => { changeQuery(e) } } placeholder="Type String"/>
                </div>
            </div>

            <div className="w-25 float-end mb-3 me-3">
                <div className="form-group">
                    <select className="form-select" onChange={ (e) => { changeCond(e) } }>
                        <option value="first_name">First Name</option>
                        <option value="last_name">Last Name</option>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default Filter;