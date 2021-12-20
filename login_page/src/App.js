import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<LoginPage />} />
				<Route exact path="/home" element={<HomePage />} />
				<Route exact path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
