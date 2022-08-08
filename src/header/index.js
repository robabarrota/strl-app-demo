import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

const Header = () => {
	const [navLinksOpen, setNavLinksOpen] = useState(false);

	const expandedClass = useMemo(() => (navLinksOpen ? '--expanded' : ''), [navLinksOpen]);
	const labelClass = (isActive) => isActive ? 'header__nav-link-label header__nav-link--active' : 'header__nav-link-label header__nav-link--inactive';
	return (
		<div className="header">
			<div className="header__responsive-bar">
				<Link className="header__title" to="/">
					STRL
				</Link>

				<button className="header__burger-menu" onClick={() => setNavLinksOpen(!navLinksOpen)}>
					<i className="fa fa-bars"></i>
				</button>
			</div>

			<div className={`header__nav-links${expandedClass}`}>
				<NavLink className="header__nav-link" to="/driver-standings">
					{({ isActive }) => (
						<div className={labelClass(isActive)}>
							<span className='header__nav-link-text'>Driver Standings</span>
							<i className={"fa-solid fa-chevron-right header__chevron"}></i>
						</div>
					)}
				</NavLink>
				<NavLink className="header__nav-link" to="/race-results">
					{({ isActive }) => (
						<div className={labelClass(isActive)}>
							<span className='header__nav-link-text'>Race Results</span>
							<i className={"fa-solid fa-chevron-right header__chevron"}></i>
						</div>
					)}
				</NavLink>
				<NavLink className="header__nav-link" to="/qualifying">
					{({ isActive }) => (
						<div className={labelClass(isActive)}>
							<span className='header__nav-link-text'>Qualifying</span>
							<i className={"fa-solid fa-chevron-right header__chevron"}></i>
						</div>
					)}
				</NavLink>
				<NavLink className="header__nav-link" to="/schedule">
					{({ isActive }) => (
						<div className={labelClass(isActive)}>
							<span className='header__nav-link-text'>Schedule</span>
							<i className={"fa-solid fa-chevron-right header__chevron"}></i>
						</div>
					)}
				</NavLink>
			</div>
		</div>
	);
}

export default Header;
