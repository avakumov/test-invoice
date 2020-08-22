import React, { useState } from "react";
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
  const [prepData, setPrepData] = useState(prepareData(buyers));

  //Подготвливает покупки для отображения, пользователи не повторяются
  function prepareData(buyers) {
    const resultBuyers = [];
    buyers.forEach((buyer) => {
      const existedBuyerIndex = resultBuyers.findIndex(
        (b) => buyer.clientId === b.clientId
      );
      if (existedBuyerIndex >= 0) {
        resultBuyers[existedBuyerIndex].countPurchases++;
        resultBuyers[existedBuyerIndex].avarageCheck =
          (resultBuyers[existedBuyerIndex].totalRevenues + Number(buyer.buy)) /
          resultBuyers[existedBuyerIndex].countPurchases;
        resultBuyers[existedBuyerIndex].totalRevenues += Number(buyer.buy);
      } else {
        resultBuyers.push({
          clientId: buyer.clientId,
          name: buyer.name,
          countPurchases: 1,
          totalRevenues: Number(buyer.buy),
          avarageCheck: Number(buyer.buy),
        });
      }
    });
    return resultBuyers;
  }

  const handleSort = (column) => {
    let copySortedBy = { ...sortedBy };

    if (sortedBy[column] === "asc") {
      const lodashSorted = _.orderBy(prepData, [column], ["desc"]);
      setPrepData(lodashSorted);
      copySortedBy[column] = "desc";
    } else {
      const lodashSorted = _.orderBy(prepData, [column], ["asc"]);
      setPrepData(lodashSorted);
      copySortedBy[column] = "asc";
    }
    setSortedBy(copySortedBy);
  };
  const renderedBuyers = prepData.map((buyer) => (
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
