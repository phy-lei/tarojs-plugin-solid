module.exports = {
  moduleDirectories: ['node_modules', 'packages'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['./babel-plugin-jsx-dom-expressions.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
