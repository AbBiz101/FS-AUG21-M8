import jwt from 'jsonwebtoken';

process.env.TS_NODE_DEV && require('dotenv').config();

export const JWTTokenGenerator = (payload: {}) => {
	new Promise((resolve, reject) =>
		jwt.sign(
			payload,
			process.env.JWT_SECRET!,
			{ expiresIn: '60m' },
			(err, token) => {
				if (err) reject(err);
				else resolve(token);
			},
		),
	);
};

export const JWTverifier = (token: string) => {
	new Promise((res, rej) =>
		jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
			if (err) rej(err);
			else res(decodedToken);
		}),
	);
};
