import { useNavigate } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function LoginPage() {
	let history = useNavigate();
	return (
		<Form>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>
			<Button variant="primary" type="submit">
				Login
			</Button>

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
		</Form>
	);
}
