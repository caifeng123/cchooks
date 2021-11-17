/**
 * @file memo教学
 * @author caifeng01
 */

import { useState, memo, useCallback } from "react";

const ExpensiveTree1 = ({ onClick }: { onClick: () => void }) => {
  const [a, A] = useState(1);
  const dateBegin = Date.now();
  // 很重的组件，不优化会死的那种，真的会死人
  while (Date.now() - dateBegin < 600) {}

  console.log("Render ExpensiveTree1 --- DONE");
  const handleClick = () => {
    A((a) => a + 1);
    onClick(a);
  };
  return (
    <div onClick={handleClick}>
      <p>很重的组件，不优化会死的那种(点我看控制台打印)</p>
    </div>
  );
};

const ExpensiveTree2 = memo(({ onClick }: { onClick: () => void }) => {
  const [a, A] = useState(1);
  const dateBegin = Date.now();
  // 很重的组件，不优化会死的那种，真的会死人
  while (Date.now() - dateBegin < 600) {}

  console.log("Render ExpensiveTree2 --- DONE");
  const handleClick = () => {
    A((a) => a + 1);
    onClick(a);
  };
  return (
    <div onClick={handleClick}>
      <p>很重的组件，经过memo优化</p>
    </div>
  );
});

const Render1 = () => {
  const [text1, updateText1] = useState("Initial value");
  const onClick1 = () => {
    console.log("回调函数被点击");
  };
  return (
    <>
      <input
        value={text1}
        onChange={(e) => {
          updateText1(e.target.value);
        }}
      />
      <ExpensiveTree1 onClick={onClick1} />
    </>
  );
};

const Render2 = () => {
  const [text2, updateText2] = useState("Initial value");
  const onClick2 = useCallback(() => {
    console.log("回调函数被点击");
  }, []);
  return (
    <>
      <input
        value={text2}
        onChange={(e) => {
          updateText2(e.target.value);
        }}
      />
      <ExpensiveTree2 onClick={onClick2} />
    </>
  );
};

export default () => {
  return (
    <>
      <Render1 />
      <Render2 />
    </>
  );
};
