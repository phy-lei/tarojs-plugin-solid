const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const plugin = require('../dist/index')

pluginTester({
  plugin,
  pluginOptions: {
    moduleName: 'r-custom',
    builtIns: ['For', 'Show'],
    generate: 'universal',
    staticMarker: '@once',
    tagCollector: jest.fn(tags => {
      expect(tags.length).toBeGreaterThan(0) // 检查至少被调用一次
    })
  },
  title: 'Convert JSX',
  fixtures: path.join(__dirname, '__tag_collector_fixtures__'),
  snapshot: true
})
