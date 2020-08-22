import React from "react";
import "./header.css";


const Header = ({logout}) => {
  const handleLogout =() => {
    logout()
  }
  return (
    <div className="header">
      Develop by Vladimir Avakumov (avakdev@gmail.com) 
      <button onClick={handleLogout} className="header__button button--default">Logout</button>
    </div>
  );
};

export default Header;
