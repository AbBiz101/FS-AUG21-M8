import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Button, Col } from 'react-bootstrap';

export default function RegisterPage() {
	const history = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [avatar, setAvatar] = useState('');

	import { Card } from 'react-bootstrap';
	{
		allData.map((data) => {
			<Card id={data.id} style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{data.name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						Price-<strong>{data.price}€</strong>
					</Card.Subtitle>
					<Card.Text>Quantity-{data.quantity}</Card.Text>
				</Card.Body>
			</Card>;
		});
	}
	const registerHandler = async (e) => {
		e.preventDefault();

		try {
			let res = await fetch('http://localhost:8000/api/Products', {
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

			if (res.ok) {
				let data = await res.json();
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log(data);
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
