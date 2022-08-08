import './App.scss';
import Header from './header';
import Qualifying from './qualifying/index';
import Schedule from './schedule/index';
import RaceResults from './race-results/index';
import DriverStandings from './driver-standings/index';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<HashRouter baseline='/'>
			<Header />
			<div className="app">
				<div className='app__content-card'>
					<Routes>
						<Route path="schedule" element={<Schedule />} />
						<Route path="race-results" element={<RaceResults />} />
						<Route path="qualifying" element={<Qualifying />} />
						<Route path="driver-standings" element={<DriverStandings />} />
						<Route path="*" element={<Qualifying />} />
					</Routes>
				</div>
			</div>

		</HashRouter>
	);
};

export default App;
