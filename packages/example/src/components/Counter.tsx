import { View, Text, Button } from '@tarojs/components'
import { createSignal } from 'solid-js'
import { Portal, Dynamic } from 'solid-js/web'
import { render } from 'solid-js/web/dist/web.cjs'
import './counter.css'

function Tab() {
  return <View>tab</View>
}
function Tab2() {
  return <View>tab2</View>
}

const componentMap = {
  Tab,
  Tab2
}
const $message = () => {
  const dispose = render(Tab, document.getElementById('kiana')!)
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', dispose)
  setTimeout(() => {
    dispose()
  }, 1000)
}

export default function Counter(props) {
  const [com, setCom] = createSignal('Tab')
  const [count, setCount] = createSignal(props.count)

  const add = () => {
    setCount(count() + 1)
    setCom('Tab2')
    $message()
  }

  const sub = () => {
    setCount(count() - 1)
    setCom('Tab')
  }

  return (
    <>
      <View class="flex">
        <button></button>
        <Button onClick={add}>+</Button>
        <Text class="add">{count()}</Text>
        <Button onClick={sub}>-</Button>
      </View>
      <View id="kiana"></View>
      <Portal mount={document.getElementById('portal')}>
        <View>
          hello portal {count()} {Math.random()}
        </View>
      </Portal>
      <Dynamic component={componentMap[com()]}></Dynamic>
    </>
  )
}
