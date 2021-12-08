import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
	return (
		<BrowserRouter>
			<Home />
			<Routes>
				<Route path="/:id" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
