import "../styles/landingPage.css";
import landingPageImgMobile from "../assets/images/backgrounds/landingpage mobile resized.jpg";

const LandingPage = () => {
  return (
    <section className="landing-section">
      <img
        src={landingPageImgMobile}
        alt="Landing page image"
        className="landing-img-mobile"
      />
      <h1 className="landing-h1">
        Fish <br /> <span className="heading-span">&</span> <br /> Friends
      </h1>
      <div className="landing-text">
        <p>Tel: 070 - 432 5601</p>
        <p>
          Adress: <br /> Mellqvistgatan 7, Karlstad
        </p>
        <p>
          Opening hours: <br /> Every dat 12:00 - 22:00
        </p>
        <p>
          <span className="note">NOTE</span>. Only takeaway
        </p>
        <button className="landing-btn">Get started</button>
      </div>
    </section>
  );
};

export default LandingPage;
