import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { createSignal } from "solid-js";
import "./index.css";

export default function Index() {
  const [count, setCount] = createSignal(0);
  const [color, setColor] = createSignal('red')

  // useLoad(() => {
  //   console.log("Page loaded.");
  // });

  return (
    <View className="index">
      <Text style={`color: ${color()}`}>Hello world! </Text>
      <Text style={{color: color()}}>Hello world2! </Text>

      <Button onClick={() => setColor('blue')}>set style</Button>
      <View>{count()}</View>
      <Button onClick={() => setCount(count() + 1)}>add</Button>
      <View>{Math.random()}</View>
    </View>
  );
}
