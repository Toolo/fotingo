module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  coverageDirectory: './coverage/',
  coverageReporters: ['html'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/test/.*(test|spec))\\.(tsx?)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'test/(.*)': '<rootDir>/test/$1',
  },
};