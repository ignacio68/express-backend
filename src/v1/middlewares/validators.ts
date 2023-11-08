import { body } from 'express-validator';

export const loginCheck = () => {
	return [
		body('email')
			.trim()
			.not()
			.isEmpty()
			.withMessage('this field is required')
			.isEmail()
			.withMessage('please enter a valid email address')
			.normalizeEmail(),
		body('password').trim().not().isEmpty().isLength({ min: 6 }),
	];
};
