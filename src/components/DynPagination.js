import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const DynPagination = ({tableSize, pageSize, fI, lI, exec}) => {

    const pages = [];
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages( Math.ceil(tableSize / pageSize) );
    }, [tableSize]);

    const paginate = (page) => {
        let lastIndex   = page * pageSize;
        let firstIndex  = lastIndex - pageSize;

        fI(firstIndex);
        lI(lastIndex);
        exec();

        setCurrentPage(page);
    }

    if( totalPages < 8 ){
        for(let i = 1; i <= totalPages; i++){
            pages.push(
                <Pagination.Item onClick={ () => { paginate(i) } } key={i} active = { i == currentPage }>{i}</Pagination.Item>
            );
        }
    } else if( totalPages >= 8 && currentPage <= 3 ){
        for(let i = 1; i <= currentPage + 7; i++){
            pages.push(
                <Pagination.Item onClick={ () => { paginate(i) } } key={i} active = { i == currentPage }>{i}</Pagination.Item>
            );
        }
    } else if( totalPages >= 8 && currentPage > 3 ){   
        let paginEndPoint = currentPage + 5;
        if( paginEndPoint <= totalPages ){  

            for(let i = (currentPage - 3); i <= paginEndPoint; i++){
                pages.push(
                    <Pagination.Item onClick={ () => { paginate(i) } } key={i} active = { i == currentPage }>{i}</Pagination.Item>
                );
            }

        } else if(paginEndPoint >= totalPages){
            for(let i = (currentPage - 7); i <= totalPages; i++){
                pages.push(
                    <Pagination.Item onClick={ () => { paginate(i) } } key={i} active = { i == currentPage }>{i}</Pagination.Item>
                );
            }
        }
    }

    return(
        <>
            <Pagination>
                {pages}
            </Pagination>
        </>
    )
}

export default DynPagination;