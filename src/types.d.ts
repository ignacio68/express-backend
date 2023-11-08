interface Authentication {
	password: string;
	salt: string;
	sessionToken?: string;
}
export interface User {
	id?: string;
	email: string;
	userName: string;
	authentication: Authentication;
}

export type UserLoginData = Pick<User, 'email', 'password'>;
