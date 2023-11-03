import { NavLink } from "react-router-dom";
import '../styles/errorRoute.css';

export default function ErrorRoute() {

    return (
        <div className="ErrorRoute">
            <h1> ERROR </h1>
            <p> This page does not exist.</p>
            <NavLink to="/" className="back-to-start"> Back to start </NavLink>
        </div>
    )
}