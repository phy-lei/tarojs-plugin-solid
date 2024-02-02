import { View, Text, Button, Icon } from '@tarojs/components'
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
    <View class="index">
      <View>
        <Text style={`color: ${color()}`}>Hello world! </Text>
      </View>
      <View>
        <Text class={cls()}>Hello world2! </Text>
      </View>
      <Button onClick={() => setCls(styles['bold'])}>set class</Button>
      <Button onClick={() => setColor('blue')}>set style</Button>
      <Counter count={0}></Counter>
      <View>{Math.random()}</View>
      <Icon size="60" type="success" />
    </View>
  )
}
