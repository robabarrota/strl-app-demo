import './App.scss';
import Header from './header';
import Qualifying from './qualifying/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="qualifying" element={<Qualifying />} />
				<Route path="*" element={<Qualifying />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
