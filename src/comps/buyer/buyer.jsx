import React from "react";
import "./buyer.css";
import Buyers from "../buyers/buyers";
import { Redirect } from "react-router-dom";

const Buyer = ({ match, buyers }) => {
  const specificBuyer = buyers.filter(
    (buyer) => buyer.clientId === match.params.id
  );
  if (specificBuyer.length !== 0) {
    const buys = specificBuyer.map((buy) => <div>{buy.buy}p.</div>);
    return (
      <div className="buyer">
        <div className="buyer__info">
          <div className="buyer__name">Name: {specificBuyer[0].name}</div>
          <div className="buyer__clientId">ID: {specificBuyer[0].clientId}</div>
          <div className="buyer__buys">
            List of Buys:
            {buys}
          </div>
        </div>

        <Buyers buyers={specificBuyer} />
      </div>
    );
  } else {
    return <Redirect to="/404" />;
  }
};

export default Buyer;
