const set = new Set()
let count = 0
const END_COUNT = 22

module.exports = {
  pluginOptions: {
    tagCollector: jest.fn(tag => {
      count++
      set.add(tag)
      if (count === END_COUNT) {
        expect(set).toEqual(new Set(['div', 'span', 'p']))
      }
    })
  }
}
