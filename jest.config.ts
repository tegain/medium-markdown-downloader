export default {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'jest-environment-node',
	transform: {
		'^.+\\.m?[tj]s?$': ['ts-jest', { useESM: true }]
	},
	moduleNameMapper: {
		'@core/(.*)': '<rootDir>/src/core/$1',
		'@ui/(.*)': '<rootDir>/src/ui/$1',
		'@infra/(.*)': '<rootDir>/src/infra/$1',
		'@usecases/(.*)': '<rootDir>/src/use-cases/$1'
	}
}
