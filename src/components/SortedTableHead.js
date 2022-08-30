import {useState} from "react";

const SortedTableHead = ({setTableData}) => {

    const [sortMethod, setSortMethd] = useState('asc');
    
    const sortBy = async (column) => {

        setTableData( (prevState) => {
            console.log(...prevState)
            if( sortMethod == 'asc' ){
                setSortMethd('desc');
                return [...prevState].sort( (a, b) => ( (a[column].toLowerCase() < b[column].toLowerCase()) ? -1 : 1 ))
            } else {
                setSortMethd('asc')
                return [...prevState].sort( (a, b) => ( (a[column].toLowerCase() > b[column].toLowerCase()) ? -1 : 1 ))
            }
        });

    }

    return(
        <thead>
            <tr>
                <th onClick={ () => { sortBy('first_name') } }>First Name</th>
                <th onClick={ () => { sortBy('last_name') } }>Last Name</th>
                <th onClick={ () => { sortBy('username') } }>Username</th>
                <th onClick={ () => { sortBy('email') } }>Email</th>
                <th onClick={ () => { sortBy('status') } }>Satus</th>
                <th>Options</th>
            </tr>
        </thead>
    )
}

export default SortedTableHead;