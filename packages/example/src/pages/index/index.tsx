import { useLoad, useDidShow } from '@tarojs/taro'
import Counter from '@/components/Counter'
import { createSignal } from 'solid-js'
import styles from './index.module.css'

export default function Index() {
  const [color, setColor] = createSignal('red')
  const [cls, setCls] = createSignal('')

  useDidShow(() => {
    console.log('%c [ xxxuseDidShow]', 'font-size:13px; background:pink; color:#bf2c9f;', 234)
  })

  useLoad(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 12313)
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
      {color() ? <icon type="success"></icon> : null}
      <input type="text" />
    </view>
  )
}
