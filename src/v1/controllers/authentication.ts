import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../../services/users';
import { authentication, random } from '../../utils/authentication';
import { API_BASE_URL } from '../../constants';
import { validationResult } from 'express-validator';

export const login = async (
	req: Request,
	res: Response,
	// next: NextFunction,
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				success: false,
				errors: errors.array(),
			});
		}
		const { email, password } = req.body;

		const user = await getUserByEmail(email).select({ salt: 1, password: 1 });

		if (!user) {
			return res.sendStatus(404);
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password !== expectedHash) {
			return res.sendStatus(403);
		}

		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString(),
		);

		await user.save();

		res.cookie('IGNACIO-AUTH', user.authentication.sessionToken, {
			domain: 'localhost',
			path: API_BASE_URL,
		});

		return res.status(201).json(user).end();
	} catch (error) {
		console.log('login::error:', error);
		return res.sendStatus(503);
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, userName } = req.body;

		if (!email || !password || !userName) {
			return res.sendStatus(400);
		}

		const userExist = await getUserByEmail(email);

		if (userExist) {
			return res.sendStatus(400);
		}

		const salt = random();
		const user = await createUser({
			email,
			userName,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log('authentication::error:', error);
		return res.sendStatus(400);
	}
};
