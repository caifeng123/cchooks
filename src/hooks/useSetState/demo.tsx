/**
 * @file useSetState Demo
 * @author caifeng01
 */

/**
 * 对setstate的增强函数
 * 1、能直接赋值单独属性 形如class 的 setState
 * 2、能对深度对象进行改变数据 如setA({"name.hah": 2})
 * 3、能像原始的setState使用回调函数进行赋值
 */
import useSetState from "./useSetState";

const useSetStateDemo = () => {
  const [a, setA] = useSetState({ name: { hah: 2 }, age: 2 });
  const [b, setB] = useSetState([{ name: 1 }]);
  return (
    <>
      A的值：{JSON.stringify(a)}
      <br />
      <button onClick={() => setA({ area: new Date() })}>
        {`setA({ area: 当前时间 })`}
      </button>
      <button onClick={() => setA({ name: { hah: 1 } })}>
        {`setA({ name: { hah: 1 } })`}
      </button>
      <button onClick={() => setA({ "name.hah": new Date() })}>
        {`setA({ name.hah: 当前时间 })`}
      </button>
      <button onClick={() => setA({ age: (Math.random() * 100) | 0 })}>
        {`setA({ age: 随机数 })`}
      </button>
      <button onClick={() => setA((c) => ({ ...c, age: 10 }))}>
        {`setA(c => ({...c,age: 10}))`}
      </button>
      <br />
      B的值：{JSON.stringify(b)}
      <br />
      <button onClick={() => setB({ "0": { c: 2 } })}>
        {`setB({'0':{c:2}})`}
      </button>
    </>
  );
};

export default useSetStateDemo;
