import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [avatar, setAvatar] = useState('');

	const registerHandler = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch('http://localhost:3003/users/register', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					firstName,
					lastName,
					avatar,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(email, password, firstName, lastName, avatar);

			if (response.ok) {
				let data = await response.json();
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log('here is the user info', data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form onSubmit={registerHandler}>
			<Form.Group controlId="formBasicFirstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
					type="text"
					placeholder="Normal text"
				/>
			</Form.Group>

			<Form.Group controlId="formBasicLastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
					type="text"
					placeholder="Normal text"
				/>
			</Form.Group>

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

			<Form.Group controlId="formBasicImage">
				<Form.Label>Image</Form.Label>
				<Form.Control
					value={avatar}
					onChange={(e) => {
						setAvatar(e.target.value);
					}}
					type="text"
					placeholder="Normal text"
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Register
			</Button>
		</Form>
	);
}
