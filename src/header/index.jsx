import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { cb } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { fetchActiveUser, logout } from '@/redux/actions';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { getActiveUser } from '@/redux/selectors';
import useIsOutsideClick from '@/hooks/useIsOutsideClick';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';

const blockName = 'header';
const bem = cb(blockName);

const Header = () => {
	const [navLinksOpen, setNavLinksOpen] = useState(false);
	const [adminMenuOpen, setAdminMenuOpen] = useState(false);

	const isLoggedIn = useIsLoggedIn();
	const userMenuContainerRef = useRef(null);

	const clickedOutsideAdminMenu = useIsOutsideClick(
		userMenuContainerRef,
		(res) => adminMenuOpen && setAdminMenuOpen(!res)
	);

	const { content: activeUser } = useSelectOrFetch(
		getActiveUser,
		fetchActiveUser
	);

	const dispatch = useDispatch();

	const expandedClass = useMemo(
		() => (navLinksOpen ? bem('nav-sub-links--expanded') : ''),
		[navLinksOpen]
	);
	const labelClass = (isActive) =>
		isActive
			? `${bem('nav-link-label')} ${bem('nav-link', 'active')}`
			: `${bem('nav-link-label')} ${bem('nav-link', 'inactive')}`;

	const closeHeader = () => {
		setNavLinksOpen(false);
		setAdminMenuOpen(false);
	};

	useEffect(() => {
		if (adminMenuOpen && clickedOutsideAdminMenu) setAdminMenuOpen(false);
	}, [adminMenuOpen, clickedOutsideAdminMenu, setAdminMenuOpen]);

	useEffect(() => {
		if (!navLinksOpen || isLoggedIn) setAdminMenuOpen(false);
	}, [navLinksOpen, isLoggedIn, setAdminMenuOpen]);

	return (
		<div className={blockName}>
			<div className={bem('top')}>
				<div className={bem('responsive-bar')}>
					<button
						className={bem('burger-menu')}
						onClick={() => setNavLinksOpen(!navLinksOpen)}
					>
						<i className="fa fa-bars"></i>
					</button>

					<Link className={bem('title')} to="/" onClick={closeHeader}>
						STRL
					</Link>

					{isLoggedIn ? (
						<div className={bem('user-nav-container')}>
							<button
								className={bem('user-nav-button')}
								onClick={() => setAdminMenuOpen((curr) => !curr)}
							>
								<span className={bem('nav-link-text')}>
									{activeUser.username?.[0].toUpperCase()}
								</span>
							</button>
							{adminMenuOpen && (
								<div
									className={bem('admin-menu')}
									ref={userMenuContainerRef}
									onBlur={() => setAdminMenuOpen(false)}
								>
									<NavLink
										className={bem('admin-nav')}
										to="/admin/seasons"
										onClick={closeHeader}
									>
										{() => (
											<div className={bem('admin-link-label')}>
												<span className={bem('nav-link-text')}>Admin Home</span>
												<i className={'fa-solid fa-chevron-right'}></i>
											</div>
										)}
									</NavLink>
									<NavLink
										className={bem('admin-nav')}
										to="/admin/account"
										onClick={closeHeader}
									>
										{() => (
											<div className={bem('admin-link-label')}>
												<span className={bem('nav-link-text')}>
													Account Settings
												</span>
												<i className={'fa-solid fa-chevron-right'}></i>
											</div>
										)}
									</NavLink>
									<button
										className={bem('admin-nav')}
										onClick={() => dispatch(logout())}
									>
										{
											<div className={bem('admin-link-label')}>
												<span className={bem('nav-link-text')}>Logout</span>
												<i className={'fa-solid fa-chevron-right'}></i>
											</div>
										}
									</button>
								</div>
							)}
						</div>
					) : (
						<div className={bem('admin-nav-container')}>
							<NavLink
								className={bem('admin-nav')}
								to="/admin/seasons"
								onClick={closeHeader}
							>
								{() => (
									<span className={bem('nav-link-text')}>
										<i className="fa-solid fa-gear"></i>
									</span>
								)}
							</NavLink>
						</div>
					)}
				</div>

				<div className={bem(`nav-links${expandedClass}`)}>
					<NavLink
						className={bem('nav-link')}
						to="/standings"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Standings</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/race-results"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Race Results</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/qualifying"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Qualifying</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/penalties"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Penalties</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/statistics"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Statistics</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/schedule"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Schedule</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/drivers"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Drivers</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/medal-count"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Leaders</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
					<NavLink
						className={bem('nav-link')}
						to="/highlights"
						onClick={closeHeader}
					>
						{({ isActive }) => (
							<div className={labelClass(isActive)}>
								<span className={bem('nav-link-text')}>Highlights</span>
								<i className={'fa-solid fa-chevron-right header__chevron'}></i>
							</div>
						)}
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Header;
