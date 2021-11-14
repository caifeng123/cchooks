/**
 * @file 依赖深比较钩子 demo
 * @author caifeng01
 */

import { useEffect, useState } from "react";
import useDeepEffect from "./useDeepEffect";

const useDeepEffectDemo = () => {
  const data = { name: ["cc"], age: 12 };
  const [number, setNumber] = useState(1);
  const deps = Object.values(data);

  // useEffect(() => {
  //   // 打开后 看打印 将会卡死 请做好准备
  //   console.log('useEffect被调用');
  //   setNumber(num => num + 1)
  // }, deps);

  useDeepEffect(() => {
    console.log("useDeepEffect被调用");
    setNumber((num) => num + 1);
  }, deps);

  return <div>{number}</div>;
};
export default useDeepEffectDemo;
