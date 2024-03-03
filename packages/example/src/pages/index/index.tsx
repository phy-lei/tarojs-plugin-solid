import { useLoad } from '@tarojs/taro'
import Counter from '@/components/Counter'
import { createSignal } from 'solid-js'
import styles from './index.module.css'

export default function Index() {
  const [color, setColor] = createSignal('red')
  const [cls, setCls] = createSignal('')

  useLoad(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 123)
  })

  return (
    <view class="index">
      <view>
        <text style={`color: ${color()}`}>Hello world! </text>
        <view>{Math.random()}</view>
      </view>
      <view>
        <text class={cls()}>Hello world2! </text>
      </view>
      <button onClick={() => setCls(styles['bold'])}>set class</button>
      <button onClick={() => setColor('blue')}>set style</button>
      <Counter count={0}></Counter>
      <view>{Math.random()}</view>
    </view>
  )
}
