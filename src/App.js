import './App.scss';
import Header from './header';
import Qualifying from './qualifying/index';
import Tracks from './tracks/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<div className="app">
				<div className='app__content-card'>
					<Routes>
						<Route path="qualifying" element={<Qualifying />} />
						<Route path="track-list" element={<Tracks />} />
						<Route path="*" element={<Qualifying />} />
					</Routes>
				</div>
			</div>

		</BrowserRouter>
	);
};

export default App;
