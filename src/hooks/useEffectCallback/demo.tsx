import { memo, useCallback, useEffect, useRef, useState } from "react";
import useEffectCallback from "./useEffectCallback";

const ExpensiveTree = memo(({ onClick }: { onClick: (e) => void }) => {
  const [a, A] = useState(1);
  const dateBegin = Date.now();
  // 很重的组件，不优化会死的那种，真的会死人
  while (Date.now() - dateBegin < 600) {}

  useEffect(() => {
    console.log("Render ExpensiveTree --- DONE");
  });
  const handleClick = () => {
    A((a) => a + 1);
    onClick(a);
  };
  return (
    <div onClick={handleClick}>
      <p>很重的组件，不优化会死的那种(点我看控制台打印)</p>
    </div>
  );
});

export default function Index() {
  const [text, updateText] = useState("Initial value");
  const temp = useRef();
  /**
   * 以下两种切换 使用观察右侧输入框Demo
   * 使用useEffectCallback正常
   * 使用useCallback
   *  - 依赖为[] 闭包导致bug不必多说
   *  - 依赖为[text] 则与什么都不用相同
   * 什么都不用 卡死
   */
  const handleSubmit = useEffectCallback(
    (c: string) => {
      console.log(`Text: ${text + c}`);
    },
    [text]
  );

  // 最通常的useCallback
  // const handleSubmit = useCallback(
  //   (c: string) => {
  //     console.log(`Text: ${text + c}`);
  //   },
  //   [text]
  // );

  // 利用ref存储state绕过依赖项检查
  // const handleSubmit = useCallback((e) => {
  //   console.log(`Text: ${temp.current}${e}`);
  // }, []);

  // 裸奔状态，本demo中类似于callback依赖 text
  //const handleSubmit = () => console.log(`Text: ${text}`)

  return (
    <>
      <input
        value={text}
        onChange={(e) => {
          updateText(e.target.value);
          temp.current = e.target.value;
        }}
      />
      <ExpensiveTree onClick={handleSubmit} />
    </>
  );
}
