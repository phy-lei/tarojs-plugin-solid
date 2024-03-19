import { createSignal } from 'solid-js'
import { Portal, Dynamic } from 'solid-js/web'
import { render } from 'solid-js/web/dist/web.cjs'
import './counter.css'

function Tab() {
  return <view>tab</view>
}
function Tab2() {
  return <view>tab2</view>
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
      <view class="flex">
        <button onClick={add}>+</button>
        <text class="add">{count()}</text>
        <button onClick={sub}>-</button>
      </view>
      <view id="kiana"></view>
      <Portal mount={document.getElementById('portal')}>
        <view>
          hello portal {count()} {Math.random()}
        </view>
      </Portal>
      <Dynamic component={componentMap[com()]}></Dynamic>
    </>
  )
}
