import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import React, { FC } from 'react';

interface HeaderProps {
	color: string;
}

export const Header: FC<HeaderProps> = ({ color }) => {
	return (
		<section className='header'>
			<NavLink to='/menu' className='header-link'>
				<h1 className='title-header'>
					Fish
					<span className='heading-symbol-login' style={{ color }}>
						{' '}
						&{' '}
					</span>
					Friends
				</h1>
			</NavLink>
		</section>
	);
};
