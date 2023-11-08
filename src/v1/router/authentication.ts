import { Router } from 'express';
import { register, login } from '../controllers/authentication';
import { loginCheck } from '../middlewares/validators';

export default (router: Router) => {
	/**
	 * @openapi
	 * /api/v1/authentication:
	 *   post:
	 * 		 tags:
	 *       - Register
	 * 		 responses:
	 * 			 200:
	 * 				 description: OK
	 * 				 content:
	 * 					 application/json:
	 * 						 schema:
	 * 							 type:object
	 *
	 */
	router.get('/', (_req, res) => {
		res.send('Hello World!');
	});
	router.post('/v1/auth/register', register);
	router.post('/v1/auth/login', loginCheck(), login);
};
