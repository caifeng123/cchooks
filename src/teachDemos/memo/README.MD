## 问题引入

- 往往听到优化 就想到useCallback、useMemo,实际上真正优化的提现是否真的有感知？
- 想象一种情况
  - 一个父子组件
  - 父组件state的频繁变化
  - 子组件非常厚重，且不依赖于父组件频繁变化的state

> 但由于react机制，父亲更新子也更新，那么会导致子组件重新渲染，导致十分卡顿
>
> 例如下面情况

```tsx
export default () => {
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
      <ExpensiveTree1 onClick={onClick1} /> // 重新渲染会非常卡！！
    </>
  );
};
```

## 处理思路

- function组件使用memo
- class组件使用pureComponent

> 两者类似，此处只对memo进行讲解

1、react组件state改变会重新渲染

2、正常组件 父重新渲染 -》 子重新渲染

3、memo组件当props或自身state改变会重新渲染

> 因此我们需要将 **耗时子组件** 用memo包裹，并保证传入的props不会一直变化，从而减少渲染次数
>
> 那么问题就转到了 =》 如何保证props不变

- 首先分析props会有几种情况
  - 基本类型 7种 常用 string、boolean、number 做属性
  - 复杂类型 n种 常用 function、array、object 做属性

- 如何保证props在其他变化的情况下自身不变

  - 对于基本类型来说，直接比较的就是值本身，无需做优化

  - 对于复杂类型来说

    - function =》 useCallback

      useCallback能保证在依赖项变化的情况下才生成新的function，从而保证function不会总是变化

      然而对于一些情况依赖项也会一直变化，导致函数也在变 useCallback 形同虚设

    > 此时推出 [useEffectCallback](https://github.com/caifeng123/cchooks/tree/main/src/hooks/useEffectCallback) （能够保证及时依赖项变化，子组件也不会重新渲染，且接收到的函数是最新的，不会出现闭包问题）

    - array ,object

      useMemo能保证在依赖项变化的情况下才生成对象指针，从而保证对象不会总是变化

      然而对于一些情况可能直接根据state生成对应数据 类似 `<ExpensiveComponent obj={{a:1, b}} />` 每次页面重新渲染都会生成新的对象，导致该组件重复渲染

    > 此时推出 [useDeepValue](https://github.com/caifeng123/cchooks/tree/main/src/hooks/useDeepValue) （能够深比较对象，若自身不变，不会生成新索引刷新）

## 解决方案

```tsx
// 复杂组件通过memo包裹
const ExpensiveTree2 = memo(ExpensiveTree);

const Render2 = () => {
  const [text2, updateText2] = useState("Initial value");
  // 通过useCallback控制方法指向唯一，保证props不会变化
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
```

## 总结

- memo要保证props指向不变
- 确定好所有props 对症下药控制变化情况
- 只针对渲染厚重的组件！！！！！否则会起反效果