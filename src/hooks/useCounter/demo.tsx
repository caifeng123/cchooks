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
      <div>{current}</div>
      <button onClick={() => inc()}>inc</button>
      <button onClick={() => dec()}>dec</button>
      <input ref={ref} />
      <button onClick={handleSet}>set</button>
      <button onClick={() => reset()}>reset</button>
    </>
  );
};

export default useCounterDemo;
