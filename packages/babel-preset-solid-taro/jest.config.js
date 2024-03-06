module.exports = {
  moduleDirectories: ['node_modules', 'packages'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['./dist/index.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
