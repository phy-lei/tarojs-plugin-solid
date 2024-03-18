import { createSignal } from 'solid-js'
import { Portal, Dynamic } from 'solid-js/web'
import './counter.css'

function Tab() {
  return <view>tab</view>
}
function Tab2() {
  return <view>tab2</view>
}

export default function Counter(props) {
  const [com, setCom] = createSignal<any>(Tab)
  const [count, setCount] = createSignal(props.count)

  const add = () => {
    setCount(count() + 1)
    setCom(Tab2)
  }

  const sub = () => {
    setCount(count() - 1)
    setCom(Tab)
  }

  return (
    <>
      <view class="flex">
        <button onClick={add}>+</button>
        <text class="add">{count()}</text>
        <button onClick={sub}>-</button>
      </view>
      <Portal mount={document.getElementById('portal')}>
        <view>
          hello portal {count()} {Math.random()}
        </view>
      </Portal>
      <Dynamic component={com()}></Dynamic>
      <Dynamic component={'view'}>2222</Dynamic>
    </>
  )
}
