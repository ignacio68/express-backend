import { connect } from 'mongoose';

//conexión a MongoDB
export const initializeDB = async (url: string) => {
	const connection = await connect(url);
	// .connect(URL || "", { dbName: "testDB" })

	try {
		if (connection) console.log('Database created');
	} catch (error) {
		console.error('connection::Error:', error);
	}
};
