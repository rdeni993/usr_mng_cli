import React, { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl } from "../components/UrlHandler";
import Protected from "../components/Protected";

import SortedTable from "../components/SortedTable";
import SortedTableHead from "../components/SortedTableHead";
import SortedTableBody from "../components/SortedTableBody";
import DynPagination from "../components/DynPagination";
import Filter from "../components/Filter";

const List = () => {
    const LIMIT = 5;

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [trimData, setTrimData] = useState([]);

    const[firstIndex, setFirstIndex] = useState(0);
    const[lastIndex, setLastIndex] = useState(LIMIT);

    const fetchAPI = async () => {
        

        try{
            const res = await axios({
                method : "GET",
                url    : baseUrl('/api/user')
            });
            setTableData(res.data.data);
            setLoading(false);
        } catch(error) {
            if(error.response.status){
                //window.location.href="/login"
            }
        }

    }

    const trim = async () => {
        setTrimData(tableData.slice(firstIndex, lastIndex));
    }

    useEffect(() => {
        trim();
    }, [lastIndex, firstIndex])

    useEffect(() => {
        if(loading)
            fetchAPI();
        else 
            trim();
    }, [tableData]);

    return(
        <Protected warn={true}>
            <Filter tableData={trimData} setTableData={setTrimData} />
            <p className="text-hidden">
                <small className="text-secondary">Click column to sort</small>
            </p>
            <SortedTable>
                <SortedTableHead setTableData={setTrimData}/>
                <SortedTableBody setTableData={setTrimData} tableSize={tableData.length} tableData={trimData}></SortedTableBody>
            </SortedTable>

            <DynPagination 
                tableSize={tableData.length} 
                pageSize = {LIMIT}
                fI = {setFirstIndex}
                lI = {setLastIndex}
                exec = {trim}
                >
            </DynPagination>

        </Protected>
    );
}

export default List;
