import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const SideBar = ({ urlAvatar }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar__items">
        <div
          className="sidebar__avatar"
          style={{ backgroundImage: `url(${urlAvatar})` }}
        >
          {" "}
        </div>
        <li className="sidebar__item">
          <Link className="sidebar__link" to="/terminals">
            Terminals
          </Link>
        </li>
        <li className="sidebar__item">
          <Link className="sidebar__link" to="/buyers">
            Buyers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
