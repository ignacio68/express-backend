import crypto from 'crypto';
import { SECRET } from '../constants';

export const authentication = (salt: string, password: string): string =>
	crypto
		.createHmac('sha256', [salt, password].join('/'))
		.update(SECRET as string)
		.digest('hex');

export const random = (): string => crypto.randomBytes(128).toString('base64');
