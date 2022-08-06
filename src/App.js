import './App.scss';
import Header from './header';
import Qualifying from './qualifying/index';
import Tracks from './tracks/index';
import RaceResults from './race-results/index';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<HashRouter baseline='/'>
			<Header />
			<div className="app">
				<div className='app__content-card'>
					<Routes>
						<Route path="race-results" element={<RaceResults />} />
						<Route path="qualifying" element={<Qualifying />} />
						<Route path="track-list" element={<Tracks />} />
						<Route path="*" element={<Qualifying />} />
					</Routes>
				</div>
			</div>

		</HashRouter>
	);
};

export default App;
