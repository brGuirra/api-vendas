/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	verbose: false,
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	preset: 'ts-jest',
	testEnvironment: 'node',
}
