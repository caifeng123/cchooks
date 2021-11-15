/**
 * @file useCounter Demo
 * @author caifeng01
 */

import { useRef } from "react";
import useCounter from "./useCounter";
const useCounterDemo = () => {
  const ref = useRef<any>();
  const [current, { inc, dec, set, reset }] = useCounter(20, {
    min: 15,
    max: 25
  });

  const handleSet = () => set(ref.current.value);
  return (
    <>
      <div>值：{current}（默认20 限制[15~25] ）</div>
      <button onClick={() => inc(2)}>自增步长2</button>
      <button onClick={() => inc(5)}>自增步长5</button>
      <button onClick={() => dec(1)}>自减步长1</button>
      <button onClick={() => dec(4)}>自减步长4</button>
      <button onClick={() => reset()}>reset</button>
      <br />
      <input ref={ref} />
      <button onClick={handleSet}>set</button>
    </>
  );
};

export default useCounterDemo;
