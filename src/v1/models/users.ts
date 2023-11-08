import { Schema, model } from 'mongoose';
import { User } from 'types';

const UserSchema = new Schema<User>({
	email: { type: String, required: true },
	userName: {
		type: String,
		maxLength: [30, 'please enter less than 30 characters'],
		required: true,
	},
	authentication: {
		password: {
			type: String,
			minLength: [6, 'please enter more than 6 characters'],
			required: true,
			select: false,
		},
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
});

UserSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const UserModel = model<User>('User', UserSchema);
