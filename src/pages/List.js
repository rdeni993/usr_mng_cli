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
        const res = await axios({
            method : "GET",
            url    : baseUrl('/api/user')
        });
        setTableData(res.data.data);
        setLoading(false);
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
