import { BiArrowBack } from 'react-icons/bi'
import { NavLink } from 'react-router-dom';
import '../styles/about.css';

export default function InformationRoute() {
    // TODO: Saknas komponent
    return (
        <div className="information">
            <div className='information--blur'>
                <NavLink to="/menu">
                    <BiArrowBack className='BiArrowBack arrow-top' />
                </NavLink>
                <header className="about-header">
                    <h1 className="about-heading">
                        Fish <span className="heading-symbol about-heading">&</span> Friends
                    </h1>
                </header>
                <main className='about-content-container'>
                    <section className='center-content'>
                        <img className='about-team-img' src='../../src/assets/images/team.jpg' />
                        <article className='content-text'>
                            <h2 className='about-content-heading'>
                                Fish <span className="heading-symbol-sub about-heading-sub">&</span> Friends
                            </h2>
                            <p className='about-restaurant'>
                                The ultimate sushi experience in Karlstad. With an experienced head chef and a knowledgeable team, they serve authentic Japanese cuisine with creative presentations. Explore our extensive menu featuring fresh ingredients and visit us in a relaxed and elegant atmosphere.
                            </p>
                            <div className='contact-information'>
                                <p>
                                    Kontakta oss för frågor på 070-432 5601.
                                </p>
                                <p>
                                    Öppettider: Alla dagar mellan 12.00-22.00
                                </p>
                            </div>
                        </article>
                    </section>
                </main>
            </div>
        </div>
    );
}
