import { useLoad, useDidShow } from '@tarojs/taro'
import { View, Text, Button, Input, Icon } from '@tarojs/components'
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
    <View class="index">
      <View ref={myDiv}>
        <Text style={`color: ${color()}`}>Hello world! </Text>
        <View>{Math.random()}</View>
      </View>
      <View>
        <Text
          class={cls()}
          classList={{
            orange: color() === 'red',
            yellow: color() !== 'red',
            fix: color() === 'red'
          }}
        >
          Hello world2!
        </Text>
      </View>
      <Button onClick={() => setCls(styles['bold'])}>set class</Button>
      <Button onClick={() => setColor('blue')}>set style</Button>

      <Counter count={0}></Counter>
      <View>{Math.random()}</View>
      {color() ? <Icon type="success"></Icon> : null}
      <Input type="text" use:model={[color, setColor]} />
      <View id="portal"></View>
    </View>
  )
}
