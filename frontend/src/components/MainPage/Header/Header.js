import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="header">
        <div className="profile-container">
          <img
            className="profile-img"
            src="https://imgur.com/q52cLwE.png"
            alt="profile"
          />
          <div className="profile-settings"></div>
        </div>
        <div className="widget">
          <div className="time-container">08:00 AM</div>
          <div className="weather-container">
            <div className="temperature">20º</div>
            <div className="weather-icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
