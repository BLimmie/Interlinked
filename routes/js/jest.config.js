module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}