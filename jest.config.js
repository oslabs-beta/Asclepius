module.exports = {
  // options that allow us collect "coverage data" info about our jest tests and store in a folder called "coverage"
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{js,jsx}'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
}

// module.exports = {
//     verbose: true,
//     rootDir: '.',
  
//     // An array of file extensions that Jest will look for when running tests.
//     testMatch: ['**/**/*.test.js'],
  
//     // A list of directories to search for test files.
//     testPathIgnorePatterns: ['/node_modules/'],
  
//     // Transform files with specific extensions
//     transform: {
//       '^.+\\.js$': 'babel-jest',
//     },
  
//     // The setupFiles property allows you to specify a set of scripts that will be run before each test.
//     // setupFiles: ['<rootDir>/jest.setup.js'],
  
//     // Coverage-related settings.
//     coverageDirectory: '<rootDir>/coverage',
//     collectCoverageFrom: ['**/**/*.test.js'],
//   };