import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../../services/users';

export const isOwner = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const currentUserId = get(req, 'identity._id') as unknown as string;

		if (!currentUserId || currentUserId !== id) {
			return res.sendStatus(403);
		} else {
			return res.sendStatus(200);
		}
	} catch (error) {
		console.log('isOwner::error:', error);
		return res.sendStatus(400);
	}
};

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sessionToken = req.cookies['IGNACIO-AUTH'];

		if (!sessionToken) {
			return res.sendStatus(403);
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res.sendStatus(403);
		}

		merge(req, { identity: existingUser });
		next();
		return res.sendStatus(200);
	} catch (error) {
		console.log('isAuthenticated::error:', error);
		return res.sendStatus(400);
	}
};
