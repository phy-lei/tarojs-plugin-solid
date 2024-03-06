const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const plugin = require('../babel-plugin-jsx-dom-expressions')

const set = new Set()
let count = 0
const END_COUNT = 21
pluginTester({
  plugin,
  pluginOptions: {
    moduleName: 'r-custom',
    builtIns: ['For', 'Show'],
    generate: 'universal',
    staticMarker: '@once',
    tagCollector: jest.fn(tag => {
      count++
      set.add(tag)
      if (count === END_COUNT) {
        expect(set).toEqual(
          new Set([
            'style',
            'h1',
            'label',
            'input',
            'span',
            'a',
            'div',
            'table',
            'tbody',
            'footer',
            'button'
          ])
        )
      }
    })
  },
  title: 'Convert JSX',
  fixtures: path.join(__dirname, '__tag_collector_fixtures__'),
  snapshot: true
})
