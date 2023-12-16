import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { cb } from '@/utils/utils';

const blockName = 'header';
const bem = cb(blockName);

const Header = () => {
	const [navLinksOpen, setNavLinksOpen] = useState(false);

	const expandedClass = useMemo(() => (navLinksOpen ? bem('nav-sub-links--expanded') : ''), [navLinksOpen]);
	const labelClass = (isActive) => isActive ? `${bem('nav-link-label')} ${bem('nav-link', 'active')}` : `${bem('nav-link-label')} ${bem('nav-link', 'inactive')}`;

	const closeHeader = () => {
		setNavLinksOpen(false);
	}

	return (
		<div 
			className={blockName} 
		>
			<div className={bem('top')}>
				<div className={bem('responsive-bar')}>
					<Link className={bem('title')} to="/" onClick={closeHeader}>
						STRL
					</Link>

					<button className={bem('burger-menu')} onClick={() => setNavLinksOpen(!navLinksOpen)}>
						<i className="fa fa-bars"></i>
					</button>
				</div>

				<div className={bem(`nav-links${expandedClass}`)}>
					<NavLink className={bem('nav-link')} to="/standings" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Standings</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/race-results" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Race Results</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/qualifying" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Qualifying</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/penalties" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Penalties</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/statistics" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Statistics</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/schedule" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Schedule</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/drivers" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Drivers</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/medal-count" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Leaders</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
					<NavLink className={bem('nav-link')} to="/highlights" onClick={closeHeader}>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Highlights</span>
								<i className={"fa-solid fa-chevron-right header__chevron"}></i>
							</div>
						)}
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Header;
