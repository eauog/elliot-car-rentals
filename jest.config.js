// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     moduleFileExtensions: ['ts', 'js'],
//     transform: {
//       '^.+\\.ts$': 'ts-jest',
//     },
//     testMatch: ['**/tests/**/*.test.ts'],  // This should point to your test directory and match files
//     globals: {
//       'ts-jest': {
//         diagnostics: false,  // Disable type checking for faster testing (optional)
//       },
//     },
//   };
  

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': ['ts-jest', {  // Move ts-jest config here
        diagnostics: false,  // Optional: Disable type-checking diagnostics to speed up tests
      }],
    },
    testMatch: ['**/tests/**/*.test.ts'],  // Matches test files
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',  // This resolves @/ to your src/ folder
    },
  };
  