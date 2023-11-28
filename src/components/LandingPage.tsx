import "../styles/landingPage.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="landing-section">
      <h1 className="landing-h1">
        Fish <br /> <span className="heading-span">&</span> <br /> Friends
      </h1>
      <div className="landing-text">
        <div className="p-div-phone">
          <p className="p-phone">Tel:</p>
          <p>070 - 432 56 01</p>
        </div>
        <div className="p-div">
          <p className="adress">Address:</p>
          <p>Mellqvistgatan 7, Karlstad</p>
        </div>
        <div className="p-div">
          <p className="p-phone">Opening hours:</p>
          <p>Every day 12:00 - 22:00</p>
        </div>
        <p>
          <span className="note">NOTE</span> Only takeaway
        </p>
        <NavLink to="/menu">
          <button className="landing-btn">Get started</button>
        </NavLink>
      </div>
    </section>
  );
};

export default LandingPage;
