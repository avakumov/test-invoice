import React, { useState } from "react";
import Buyers from "../buyers/buyers";
import "./pagination.css";

const Pagination = ({ buyers }) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const getBuyers = () => {
    const start = (currentPage - 1) * perPage;
    return buyers.slice(start, start + perPage);
  };

  const getCountPage = () => {
    const countPages = Math.ceil(buyers.length / perPage);
    const pageNumbers = [];
    for (let i = 1; i <= countPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((page) => (
      <div
        key={page}
        className={(page===currentPage)?"pagination__page--current":"pagination__page"}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </div>
    ));
  };

  const handleChangePerPage = (count) => {
    setPerPage(count);
    setCurrentPage(1);
  };

  return (
      <div className="pagination">
        <div className="pagination__data">
          <Buyers buyers={getBuyers()} />
        </div>
        <div className="pagination__actions">
            <div className="pagination__pages">
                {getCountPage()}
            </div>
          
          <div className="pagination__per-pages">
            {[5, 10, 15].map((perP) => {
              return (
                <div
                  key={perP}
                  className={(perP===perPage)?"pagination__per-page--current":"pagination__per-page"}
                  onClick={() => handleChangePerPage(perP)}
                >
                  {perP}
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Pagination;
