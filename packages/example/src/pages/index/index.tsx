import { View, Text, Button, Icon } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Counter from "@/components/Counter";
import { createSignal } from "solid-js";
import "./index.css";

export default function Index() {
  const [color, setColor] = createSignal('red')

  useLoad(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 123);
  })

  return (
    <View className="index">
      <Text style={`color: ${color()}`}>Hello world! </Text>
      <Text style={{color: color()}}>Hello world2! </Text>
      <Button onClick={() => setColor('blue')}>set style</Button>
      <Counter count={0}></Counter>
      <View>{Math.random()}</View>
      <Icon size='60' type='success' />
    </View>
  );
}
