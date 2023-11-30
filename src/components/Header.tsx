import { NavLink } from "react-router-dom";
import "../styles/header.css";

export function Header() {
  return (
    <section className="header">
      <NavLink to="/menu" className="header-link">
        <h1 className="title-header">Fish <span className="heading-symbol-login">&</span>Friends</h1>
      </NavLink>
    </section>
  );
}
