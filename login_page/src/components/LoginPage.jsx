import { useNavigate } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let history = useNavigate();

	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			const params = new URLSearchParams(window.location.search);
			const accessToken =
				localStorage.getItem('ACCESS_TOKEN') || params.get('accessToken');

			let res = await fetch('http://localhost:3003/users/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
				headers: { 'Content-Type': 'application/json' },
            });
            
			if (res.ok) {
				let data = await res.json();
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log(data);
				history('/home');
			} else {
				history('/');
			}
		} catch (error) {
			history('/');
			console.log(error);
		}
	};
	return (
		<>
			<Form onSubmit={loginHandler}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						placeholder="Enter email"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
			<Button
				onClick={(e) => {
					history('/register');
				}}
				variant="primary"
			>
				Register
			</Button>

			<a href="http://localhost:3003/users/googleLogin">
				<Button variant="primary">Login with Google Account</Button>
			</a>
		</>
	);
}
