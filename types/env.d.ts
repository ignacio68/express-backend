declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			NODE_ENV: 'dev' | 'prod' | 'test';
			MONGO_DB_URI: string;
			PASSWORD: string;
			PORT: string;
			API_BASE_URL: string;
			SECRET: string;
		}
	}
}

export {};
