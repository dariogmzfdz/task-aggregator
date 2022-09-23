import React from "react";
import "./Menu.css";

function Menu() {
  return (
    <>
      <input
        className="menu-icon"
        type="checkbox"
        id="menu-icon"
        name="menu-icon"
      />
      <label htmlFor="menu-icon"></label>
      <div className="label-bg"></div>
      <nav className="nav">
        <ul className="pt-5">
          <li>
            <a href="#">Today's tasks</a>
          </li>
          <li>
            <a href="#">Major tasks</a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="https://www.3djuegos.com/" target={"_blank"}>
              News
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
