import { NavLink, Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        {/* <a href="/" className="logo"> */}
        Beauty
        <br />
        Admin
      </Link>
      <nav>
        <ul className="header__list">
          <li className="header__link">
            {/* <li className="header__link header__link_active"> */}
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                isActive ? "header__link_active" : ""
              }
            >
              Schedule
            </NavLink>
            {/* <a href="/">Schedule</a> */}
          </li>
          <li className="header__link">
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "header__link_active" : ""
              }
            >
              History
            </NavLink>
            {/* <a href="/">History</a> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
