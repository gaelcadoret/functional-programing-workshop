import type { Config } from 'jest'

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	collectCoverageFrom: [
		'src/**/**.ts',
		'!src/http/plugins/**',
		'!src/http/server.ts',
	],
	moduleNameMapper: {
		'^~/config/(.*)$': '<rootDir>/src/config/$1',
		'^~/domain/(.*)$': '<rootDir>/src/domain/$1',
		'^~/http/(.*)$': '<rootDir>/src/http/$1',
		'^~/infra/(.*)$': '<rootDir>/src/infra/$1',
		'^~/lib/(.*)$': '<rootDir>/src/lib/$1',
	},
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
}

export default config
