import { Request, Response } from 'express';
import {
	getUsers,
	deleteUserById,
	getUserById,
	getUserByEmail,
} from '../../services/users';
// import { ValidationError } from "../errors/validationErrors";

export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await getUsers();
		// if (users.length < 10) {
		//   throw new ValidationError("Users not exists", "user");
		// }

		return res.status(200).json(users).end();
	} catch (error) {
		return res.sendStatus(400);
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const { email } = req.params;
		const user = await getUserByEmail(email);
		return res.status(200).json(user).end();
	} catch (error) {
		return res.sendStatus(400);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedUser = await deleteUserById(id);

		return res.json(deletedUser).end();
	} catch (error) {
		console.log('deleteUser::error:', error);
		return res.sendStatus(400);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userName } = req.body;

		if (!userName) {
			console.log('updateUser::userName NOT exists!!');
			return res.sendStatus(400);
		}

		const user = await getUserById(id);

		if (user) {
			console.log('updateUser::user', user);
			user.userName = userName;
			await user.save();

			return res.status(200).json(user);
		} else {
			console.log('updateUser::NOT user');
			return res.sendStatus(404);
		}
	} catch (error) {
		console.log('updateUser::error:', error);
		return res.sendStatus(400);
	}
};
