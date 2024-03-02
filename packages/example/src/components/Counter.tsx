import { createSignal } from 'solid-js'
import './counter.css'
export default function Counter(props) {
  const [count, setCount] = createSignal(props.count)

  const add = () => {
    setCount(count() + 1)
  }

  const sub = () => {
    setCount(count() - 1)
  }

  return (
    <view class="flex">
      <button onClick={add}>+</button>
      <text class="add">{count()}</text>
      <button onClick={sub}>-</button>
    </view>
  )
}
