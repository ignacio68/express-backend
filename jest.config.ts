// import type { JestConfigWithTsJest } from "ts-jest";

export default {
	clearMocks: true,
	verbose: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['/node_modules/', '/src/db/'],
	coverageProvider: 'v8',
	coverageReporters: ['json', 'text', 'lcov', 'clover'],
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	testEnvironment: 'node',
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	testPathIgnorePatterns: [
		'<rootDir>/build/',
		'<rootDir>/node_modules/',
		'<rootDir>/coverage/',
	],
	testMatch: [
		'**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)',
		'**/?(*.)+(spec|test).[tj]s?(x)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
