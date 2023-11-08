import { Router } from 'express';
import {
	getAllUsers,
	deleteUser,
	updateUser,
	getUser,
} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: Router) => {
	router.get('/v1/users', isAuthenticated, getAllUsers);
	router.get('/v1/users/:email', getUser);
	router.delete('/v1users/:id', isAuthenticated, isOwner, deleteUser);
	router.patch('/v1/users/:id', isAuthenticated, isOwner, updateUser);
};
