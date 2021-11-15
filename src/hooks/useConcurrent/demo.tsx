/**
 * @file useConcurrent Demo
 * @author caifeng01
 */

import { Button } from "antd";
import { useState } from "react";
import useConcurrent from "./useConcurrent";

const promise1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.random()), 1000);
  });
const promise2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(Math.random()), 2000);
  });
const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.random()), 3000);
  });

const useConcurrentDemo = () => {
  const [state, setState] = useState(1);
  const { res, failNumber, reload } = useConcurrent({
    apis: [promise1, promise2, promise3],
    params: [],
    filter: [],
    dep: [state]
  });
  return (
    <>
      - 处理并发钩子，当同一个页面需要同时并发请求多个不相关函数时使用
      <br />
      - 通过指定 apis 和对应的 params 去发请求
      <br />
      - 通过指定 filter 处理返回值
      <br />- 通过指定 dep 触发重新请求
      <div>失败数：{failNumber}</div>
      模拟并发请求结果：{JSON.stringify(res)}
      <br />
      <Button onClick={() => setState(state + 1)}>重新请求 by dep</Button>
      <br />
      <Button onClick={reload}>重新请求 by reload</Button>
    </>
  );
};

export default useConcurrentDemo;
