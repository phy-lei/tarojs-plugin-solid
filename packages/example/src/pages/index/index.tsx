import { View, Text } from '@tarojs/components'
// import { useLoad } from '@tarojs/taro'
// import { createSignal } from 'solid-js'
import './index.css'

export default function Index() {

  // const [count, setCount] = createSignal(0)

  // useLoad(() => {
  //   console.log('Page loaded.')
  // })

  return (
    <View className= 'index' >
    <Text>Hello world! </Text>
  {/* <View>{count()}</View>
      <View onClick={() => setCount(count() + 1)}>add</View> */}
  </View>
  )
}
