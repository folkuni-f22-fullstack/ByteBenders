import { BiArrowBack } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import '../styles/about.css';

export default function InformationRoute() {
	// TODO: Saknas komponent
	return (
		<div className='information'>
			<div className='information--blur'>
				<header className='about-header'>
				<NavLink to='/menu'>
					<BiArrowBack className='return-arrow-icon' />
				</NavLink>
					<h1 className='about-heading'>
						Fish{' '}
						<span className='heading-symbol-about about-heading'>&</span>{' '}
						Friends
					</h1>
				</header>
				<main className='about-content-container'>
					<section className='center-content'>
						<img className='about-team-img' src='/about.jpg' />
						<article className='content-text'>
							<h2 className='about-content-heading'>
								Fish{' '}
								<span className='heading-symbol-sub about-heading-sub'>
									&
								</span>{' '}
								Friends
							</h2>
							<p className='about-restaurant'>
								The ultimate sushi experience in Karlstad. With
								an experienced head chef and a knowledgeable
								team, they serve authentic Japanese cuisine with
								creative presentations. Explore our extensive
								menu featuring fresh ingredients and visit us in
								a relaxed and elegant atmosphere.
							</p>
							<div className='contact-information'>
								<p><span className="info-point">Contact:</span> 070-432 56 01</p>
								<p>
									<span className="info-point">Opening hours:</span> Every day between 12:00-22:00
								</p>
								<p><span className="info-point">Address:</span> Mellqvistgatan 7, Karlstad</p>
							</div>
						</article>
					</section>
				</main>
			</div>
		</div>
	);
}
