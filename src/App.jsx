import './App.scss';
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
import EditQualifying from './admin/edit-qualifying';

import { Navigate, ScrollRestoration, createHashRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useIsLoggedIn from './hooks/useIsLoggedIn';

const PrivateRoutes = () => {
	const location = useLocation();
	const isLoggedIn = useIsLoggedIn();
	return isLoggedIn
		? <Outlet />
		: <Navigate to="/auth/login" replace state={{ from: location }} />;
};

const AuthRoute = () => {
	const isLoggedIn = useIsLoggedIn();

	return isLoggedIn
		? <Navigate to="/admin/seasons" replace />
		: <Auth />;
};

const router = createHashRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "schedule",
				element: <Schedule />,
			},
			{
				path: "drivers",
				element: <Drivers />,
			},
			{
				path: "driver/:driverName",
				element: <Driver />,
			},
			{
				path: "race-results",
				element: <RaceResults />,
			},
			{
				path: "qualifying",
				element: <Qualifying />,
			},
			{
				path: "standings",
				element: <Standings />,
			},
			{
				path: "medal-count",
				element: <MedalCount />,
			},
			{
				path: "statistics",
				element: <Statistics />,
			},
			{
				path: "highlights",
				element: <Highlights />,
			},
			{
				path: "penalties",
				element: <Penalties />,
			},
			{
				path: "/auth/*",
				element: <AuthRoute />,
			},
			{
				path: "/admin",
				element: <PrivateRoutes />,
				children: [
					{
						path: "seasons",
						element: <EditQualifying />,
					}
				]
			},
			{
				path: "/",
				element: <Navigate replace to="/race-results" />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		]
	},
	
]);

function Layout() {
	return (
		<>
			<Header />
			<div className="app">
				<div className='app__content-card'>
					<Outlet />
				</div>
			</div>
			<ToastContainer position="bottom-left" />
			<ScrollRestoration />
		</>
	);
  }
const App = () => {
	return <RouterProvider router={router} />
};

export default App;
