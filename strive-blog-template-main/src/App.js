import React from 'react';
import Home from './views/home';
import Blog from './views/blog';
import NewBlogPost from './views/new';
import Footer from './components/footer';
import NavBar from './components/navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Route path="/" exact component={Login} />
			<Route path="/home" exact component={Home} />
			<Route path="/blog/:id" exact component={Blog} />
			<Route path="/new" exact component={NewBlogPost} />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
