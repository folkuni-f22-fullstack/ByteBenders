import "../styles/landingPage.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
    return (
        <section className="landing-section">

            {/* HEADER-LOGGA */}
            <section className="landing-heading-section">
                <h1 className="landing-h1">Fish</h1>
                <div className="heading-symbol">&</div>
                <h1 className="landing-h1">Friends</h1>
            </section>

            <div className="landing-text">
                <div className="tags">
                    <p className="tag-text">Opening hours</p>
                    <p className="tag-text">Phone number</p>
                    <p className="tag-text">Address</p>
                </div>

                <div className="tags-info">
                    <p className="tag-info-text">Every day 12:00-22:00</p>
                    <p className="tag-info-text">070 - 432 56 01</p>
                    <p className="tag-info-text">
                        Mellqvistgatan 7, <br />
                        Karlstad
                    </p>
                </div>
            </div>

            <p className="note">
                <span>NOTE:</span> Only takeaway
            </p>
            <NavLink to="/menu">
                <button className="landing-btn">Get started</button>
            </NavLink>
        </section>
    );
};

export default LandingPage;
