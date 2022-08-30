import MenuDropdow from "./MenuDropdown";

const SortedTableBody = ({setTableData, tableData}) => {

    return(
        <tbody>
        {
            tableData.map( (user, index) => {
                return(
                    <tr key={index}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>
                            <MenuDropdow currentTable={tableData} updateTable={setTableData} username={user.username} user={user.id} />
                        </td>
                    </tr>
                )
            })
        }
        </tbody>
    )
}

export default SortedTableBody;