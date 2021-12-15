import jwt from 'jsonwebtoken';

export const JWTAuthenticator= async (user) => {
	const accessToken = await generateJWTToken({ _id: user._id });
	return accessToken;
};

const JWTTokenGenerator = (payload) =>
	new Promise((resolve, reject) =>
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: '15m' },
			(err, token) => {
				if (err) reject(err);
				else resolve(token);
			},
		),
	);

export const JWTverifier = (token) =>
	new Promise((res, rej) =>
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) rej(err);
			else res(decodedToken);
		}),
	);