import { Form, Button } from 'react-bootstrap';
import React from 'react';
import './login.css';

export default function Login() {
	return (
		<Form column sm={2} className="loginComponent">
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>

			<div className="form_btns">
				<Button variant="primary" className="mt-3" type="submit">
					login
				</Button>
				<a href="http://localhost:3002/user/google">
					<Button variant="info" className="mt-3" type="submit">
						Login with Google
					</Button>
				</a>
			</div>
			<Button className="mt-5" type="submit">
				Register
			</Button>
		</Form>
	);
}
