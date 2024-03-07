const set = new Set()
let count = 0
const END_COUNT = 21

module.exports = {
  pluginOptions: {
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
  }
}
