import { CustomError } from '../../errors/customErrors';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (err instanceof CustomError) {
		return res.send({ errors: err.serializeErrors });
	}
	return res.send({ errors: [{ message: 'Some error ocurred!!' }] });
};
