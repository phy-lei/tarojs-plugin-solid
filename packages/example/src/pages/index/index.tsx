import { useLoad, useDidShow } from '@tarojs/taro'
import Counter from '@/components/Counter'
import { createSignal } from 'solid-js'
import useDirective from '@/useHooks/useDirectives'
import styles from './index.module.css'
import { TaroElement } from '@tarojs/runtime'

let myDiv: TaroElement

export default function Index() {
  const { model } = useDirective()
  const [color, setColor] = createSignal('red')
  const [cls, setCls] = createSignal('')

  useDidShow(() => {
    console.log('%c [ xxxuseDidShow]', 'font-size:13px; background:pink; color:#bf2c9f;', 234)
  })

  useLoad(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', myDiv)
  })

  return (
    <view class="index">
      <view ref={myDiv}>
        <text style={`color: ${color()}`}>Hello world! </text>
        <view>{Math.random()}</view>
      </view>
      <view>
        <text
          class={cls()}
          classList={{
            orange: color() === 'red',
            yellow: color() !== 'red',
            fix: color() === 'red'
          }}
        >
          Hello world2!
        </text>
      </view>
      <button onClick={() => setCls(styles['bold'])}>set class</button>
      <button onClick={() => setColor('blue')}>set style</button>

      <Counter count={0}></Counter>
      <view>{Math.random()}</view>
      {color() ? <icon type="success"></icon> : null}
      <input type="text" use:model={[color, setColor]} />
      <view id="portal"></view>
    </view>
  )
}
