import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	verbose: false,
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	preset: 'ts-jest',
	testEnvironment: 'node',
}
export default config
