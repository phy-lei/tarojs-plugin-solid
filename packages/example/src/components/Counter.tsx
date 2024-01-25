import { View, Text, Button } from "@tarojs/components";
import { createSignal } from "solid-js";
import './counter.css'
export default function Counter(props) {
  const [count, setCount] = createSignal(props.count);

  const add = () => {
    setCount(count() + 1)
  }

  const sub = () => {
    setCount(count() - 1)
  }

  return (
    <View class="flex">
      <Button onClick={add}>+</Button>
      <Text class="add">{count()}</Text>
      <Button onClick={sub}>-</Button>
    </View>
  );
}
