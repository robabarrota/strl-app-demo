import './App.scss';
import {
	Navigate,
	ScrollRestoration,
	createHashRouter,
	RouterProvider,
	Outlet,
	useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './header';
import Qualifying from './qualifying/index';
import Schedule from './schedule/index';
import RaceResults from './race-results/index';
import MedalCount from './medal-count/index';
import Highlights from './highlights/index';
import NotFound from './not-found';
import Penalties from './penalties/index';
import Standings from './standings/index';
import Statistics from './statistics/index';
import Drivers from './drivers/index';
import Driver from './driver/index';
import Auth from './auth';
import 'react-toastify/dist/ReactToastify.min.css';
import useIsLoggedIn from './hooks/useIsLoggedIn';
import AccountSettings from './admin/account-settings';
import AdminSeasons from './admin/admin-seasons';
import AdminSeason from './admin/admin-season';
import AdminSeasonTrack from './admin/admin-season-track';
import useIsMobile from './hooks/useIsMobile';

const PrivateRoutes = () => {
	const location = useLocation();
	const isLoggedIn = useIsLoggedIn();
	return isLoggedIn ? (
		<Outlet />
	) : (
		<Navigate to="/auth/login" replace state={{ from: location }} />
	);
};

const AuthRoute = () => {
	const isLoggedIn = useIsLoggedIn();

	return isLoggedIn ? <Navigate to="/admin/seasons" replace /> : <Auth />;
};

const router = createHashRouter([
	{
		element: <Layout />,
		children: [
			{
				path: 'schedule',
				element: <Schedule />,
			},
			{
				path: 'drivers',
				element: <Drivers />,
			},
			{
				path: 'driver/:driverName',
				element: <Driver />,
			},
			{
				path: 'race-results',
				element: <RaceResults />,
			},
			{
				path: 'qualifying',
				element: <Qualifying />,
			},
			{
				path: 'standings',
				element: <Standings />,
			},
			{
				path: 'medal-count',
				element: <MedalCount />,
			},
			{
				path: 'statistics',
				element: <Statistics />,
			},
			{
				path: 'highlights',
				element: <Highlights />,
			},
			{
				path: 'penalties',
				element: <Penalties />,
			},
			{
				path: 'auth/*',
				element: <AuthRoute />,
			},
			{
				path: 'admin',
				element: <PrivateRoutes />,
				children: [
					{
						path: 'seasons',
						element: <AdminSeasons />,
					},
					{
						path: 'season/:seasonId',
						element: <AdminSeason />,
					},
					{
						path: 'season/:seasonId/race/:raceId',
						element: <AdminSeasonTrack />,
					},
					{
						path: 'account',
						element: <AccountSettings />,
					},
				],
			},
			{
				path: '/',
				element: <Navigate replace to="/race-results" />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

function Layout() {
	const isMobile = useIsMobile();
	return (
		<>
			<Header />
			<div className="app">
				<div className="app__content-card">
					<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
						<Outlet />
					</DndProvider>
				</div>
			</div>
			<ToastContainer position="bottom-left" />
			<ScrollRestoration />
		</>
	);
}
const App = () => <RouterProvider router={router} />;

export default App;
