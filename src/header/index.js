import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

const Header = () => {
	const [navLinksOpen, setNavLinksOpen] = useState(false);

	const expandedClass = useMemo(() => (navLinksOpen ? '--expanded' : ''), [navLinksOpen]);
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
				<NavLink className="header__nav-link" to="/qualifying">
					<div className="header__nav-link-label">
						<span>Qualifying</span>
						<i className={"fa-solid fa-chevron-right header__chevron"}></i>
					</div>
				</NavLink>
				<NavLink className="header__nav-link" to="/qualifying">
					<div className="header__nav-link-label">
						<span>Qualifying</span>
						<i className={"fa-solid fa-chevron-right header__chevron"}></i>
					</div>
				</NavLink>
			</div>
		</div>
	);
}

export default Header;
