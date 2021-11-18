/**
 * @file useeffect 教学
 * @author caifeng01
 */

import { useEffect, useState } from "react";
import { Button } from "antd";

const SonDemo = ({ fatherA }: any) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState({ 1: 2 });
  const c = [a, fatherA];

  useEffect(() => {
    console.log("init");
    return () => console.log("finish");
  }, []);
  useEffect(() => {
    console.log("a change");
  }, [a]);

  useEffect(() => {
    console.log("b change");
  }, [b]);

  useEffect(() => {
    console.log("c change(father)");
  }, [c]);

  useEffect(() => {
    console.log("father change");
  }, [...c]);

  return (
    <>
      打开console，随意感受下怎么会造成渲染~
      <br />
      a:{a}
      <Button onClick={() => setA((a) => a + 1)}>+a </Button>
      <br />
      b:{JSON.stringify(b)}
      <Button onClick={() => setB({ 1: b[1] + 1 })}>b["1"] + 1 </Button>
    </>
  );
};

export default () => {
  const [fatherA, setFatherA] = useState(0);
  return (
    <>
      <SonDemo fatherA={fatherA} />
    </>
  );
};
