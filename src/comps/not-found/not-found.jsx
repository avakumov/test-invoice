import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  return (
    <div className="not-found">
      Page not found (404 error)
      <br />
      <br />
      <Link to="/">Go to home page</Link>
    </div>
  );
};

export default NotFound;
