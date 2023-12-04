import { NavLink } from "react-router-dom";
import "../styles/header.css";

export function Header({color}) {
  return (
    <section className="header">
      <NavLink to="/menu" className="header-link">
        <h1 className="title-header">
          Fish 
          <span className="heading-symbol-login" style={{color: color}}> & </span>
          Friends
        </h1>
      </NavLink>
    </section>
  );
}
