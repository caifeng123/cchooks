/**
 * @file useDeepValue钩子 demo
 * @author caifeng01
 */

import { memo, useEffect, useState } from "react";
import useCounter from "../useCounter/useCounter";
import useDeepValue from "./useDeepValue";

const ExpensiveTree = memo(({ obj }: { obj: any }) => {
  const [a, A] = useState(1);
  const dateBegin = Date.now();
  // 很重的组件，不优化会死的那种，真的会死人
  while (Date.now() - dateBegin < 600) {}

  useEffect(() => {
    console.log("Render ExpensiveTree --- DONE");
  });
  const handleClick = () => {
    A((a) => a + 1);
  };
  return (
    <div onClick={handleClick} style={{ border: "1px solid" }}>
      外侧obj: {JSON.stringify(obj)}
      内部a: {JSON.stringify(a)}
      <p>很重的组件，不优化会死的那种</p>
    </div>
  );
});

export default () => {
  const [text, updateText] = useState("Initial value");
  const [number, { inc }] = useCounter(0);
  const obj = useDeepValue({
    a: 2,
    number
  });

  return (
    <>
      <input
        value={text}
        onChange={(e) => {
          updateText(e.target.value);
        }}
      />
      <ExpensiveTree obj={obj} />
      <button onClick={() => inc(1)}>number+1</button>
    </>
  );
};
