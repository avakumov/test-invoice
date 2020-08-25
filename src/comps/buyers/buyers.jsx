import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import "./buyers.css";

const Buyers = ({ buyers }) => {

  const [sortedBy, setSortedBy] = useState({
    name: "asc",
    avarageCheck: "asc",
    countPurchases: "asc",
    totalRevenues: "asc",
  });
  

  const [sortedBuyers, setSortedBuyers] = useState([]);
  useEffect(() => setSortedBuyers(buyers), [buyers])
 

  const handleSort = (column) => {
    let copySortedBy = { ...sortedBy };

    if (sortedBy[column] === "asc") {
      const lodashSorted = _.orderBy(sortedBuyers, [column], ["desc"]);
      setSortedBuyers(lodashSorted);
      copySortedBy[column] = "desc";
    } else {
      const lodashSorted = _.orderBy(sortedBuyers, [column], ["asc"]);
      setSortedBuyers(lodashSorted);
      copySortedBy[column] = "asc";
    }
    setSortedBy(copySortedBy);
  };
  const renderedBuyers = sortedBuyers.map((buyer) => (
    <tr key={buyer.clientId}>
      <td>
        <div className="buyers__item-title">
          <Link to={`/buyers/${buyer.clientId}`}>{buyer.clientId}</Link>
        </div>
      </td>
      <td>
        <div className="buyers__item-title">{buyer.name}</div>
      </td>
      <td>
        <div className="buyers__item-description">{buyer.avarageCheck}</div>
      </td>
      <td>
        <div className="buyers__item-description">{buyer.countPurchases}</div>
      </td>
      <td>
        <div className="buyers__item-description">{buyer.totalRevenues}</div>
      </td>
    </tr>
  ));
  return (
    <div className="buyers">
      <div className="buyers__items">
        <table className="buyers__table">
          <thead>
            <tr>
              <th>Id buyers</th>
              <th className="buyers__sort" onClick={() => handleSort("name")}>
                Name buyer <i className="fas fa-sort"></i>
              </th>
              <th
                className="buyers__sort"
                onClick={() => handleSort("avarageCheck")}
              >
                Avarage check <i className="fas fa-sort"></i>
              </th>
              <th
                className="buyers__sort"
                onClick={() => handleSort("countPurchases")}
              >
                Count Purchases <i className="fas fa-sort"></i>
              </th>
              <th
                className="buyers__sort"
                onClick={() => handleSort("totalRevenues")}
              >
                Total Revenues <i className="fas fa-sort"></i>
              </th>
            </tr>
          </thead>
          <tbody>{renderedBuyers}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Buyers;
