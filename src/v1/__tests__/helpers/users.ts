import { User } from 'types';

export const users: User[] = [
	{
		id: '653a9ae251c16622741e219b',
		email: 'jhondoe@test.com',
		userName: 'John Doe',
		authentication: {
			password: '123456',
			salt: '1',
			sessionToken: '123456',
		},
	},
	{
		id: '653a9891d946ad43191fe579',
		email: 'pepefoo@test.com',
		userName: 'Pepe Foo',
		authentication: {
			password: '123456',
			salt: '1',
			sessionToken: '123456',
		},
	},
];
