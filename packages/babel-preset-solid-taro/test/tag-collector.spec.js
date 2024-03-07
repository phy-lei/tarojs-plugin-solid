const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const plugin = require('../babel-plugin-jsx-dom-expressions')

pluginTester({
  plugin,
  title: 'Convert JSX',
  fixtures: path.join(__dirname, '__tag_collector_fixtures__'),
  snapshot: true
})
