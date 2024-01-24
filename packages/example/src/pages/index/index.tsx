import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { createSignal } from "solid-js";
import "./index.css";
import { useLoad } from "@tarojs/taro";

export default function Index() {
  const [count, setCount] = createSignal(0);
  const [color, setColor] = createSignal('red')

  const handleClick = () => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', Taro);
    setCount(count() + 1)
    Taro.navigateTo({
      url: '/pages/about/index'
    })
  }

  useLoad(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 123);
  })

  return (
    <View className="index">
      <Text style={`color: ${color()}`}>Hello world! </Text>
      <Text style={{color: color()}}>Hello world2! </Text>
      <Button onClick={() => setColor('blue')}>set style</Button>
      <View>{count()}</View>
      <Button onClick={handleClick}>add</Button>
      <View>{Math.random()}</View>
    </View>
  );
}
