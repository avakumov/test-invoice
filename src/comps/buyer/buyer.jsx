import React from "react";
import "./buyer.css";
import { Redirect } from "react-router-dom";

const Buyer = ({ match, buyers }) => {
  const specificBuyer = buyers.filter(
    (buyer) => buyer.clientId === match.params.id
  );
  if (specificBuyer.length !== 0) {
    let buysAll = 0
    specificBuyer.forEach(buy => {
      buysAll+=buy.buy
    });
    const buys = specificBuyer.map((buy) => <div>{buy.buy}p.</div>);
    
    return (
      <div className="buyer">
        <div className="buyer__info">
          <div className="buyer__clientId">ID: {specificBuyer[0].clientId}</div>
          <div className="buyer__name">Name: {specificBuyer[0].name}</div>
          <div className="buyer__total-revenues">Total Revenues: {buysAll}p.</div>
          <div className="buyer__avarage-check">Avarage check: {buysAll/specificBuyer.length}p.</div>
          <div className="buyer__buys">
            List of Buys:
            {buys}
          </div>
        </div>

      </div>
    );
  } else {
    return <Redirect to="/404" />;
  }
};

export default Buyer;
