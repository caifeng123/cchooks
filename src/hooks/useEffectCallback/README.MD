## 适用场景

> 唯一指向usecallback钩子 - 

Introduction：

- 时常我们会遇到很厚重的组件（体量大无优化） - 立刻想到使用 子组件Memo + 父组件传参useCallBack 组合形式【可看teachDemo】

  - 但当我们需要传入参数（方法）中强依赖于 父组件的state 就得将state加入依赖项
    - 此时当state一变动 方法参数就得生成新的
    - 新的方法参数就得生成新的子组件，又会导致子组件重新渲染

  > 建议先去了解usecallback 和 memo

- 总结一下使用场景就是

  - 子组件厚重（很简单的子组件使用的话，反而会起反作用）
  - 子组件需要处理 **父组件传入的回调cb** 
  - **父组件传入的回调cb** 依赖于父组件的某一频繁变动的state（当state一变cb就变，cb一变子组件重新渲染）
  - 想要优化代码，减少渲染次数

- 最终人话总结就是

  - 不仅延续满足 usecallback 的功能
  - 并且让返回值保证指向唯一，子组件无需关注渲染情况

## demo

![cc](https://raw.githubusercontent.com/caifeng123/pictures/master/cc.gif)

- 简介

> 我们来想象一种情况
>
> - 一个父子组件，子组件相当厚重（内部模拟大循环变慢加载）
> - 子组件需要执行父组件的回调函数（此处设置为点击子组件执行 **父组件回调cb**（打印父组件state的值））
> - 父组件的state会频繁变动 -》 生成新的**父组件回调cb**  =》子组件渲染 -》 页面卡顿

此时杠精就跳出来了

- A: 我才不会写那么厚重的子组件呢，正交 + 抽象 + memo存储，怎么可能出现这种情况

  【bb第一名，bug修不停，这是在重构优化代码而不是从头写代码】

- B: 你不会将频繁变动的值在ref里存储一份，再将其作为放入父组件的useCallback中调用？这样就不需要强依赖于state了

  【这也是我想到的最好方法了，但当遇到频繁变动的值相当多的时候，就必须为所有值设定相应ref，变量相当多】



此时就要介绍一下*useEffectCallback*这个钩子了

- 延续B同学的想法，将变量放入ref，躲过依赖项检查
- 实际上可以直接将整个 **父组件回调cb** 放入ref，一样能躲过依赖项检查，且指向唯一
- 对于上面demo的例子来说 **父组件回调cb** （useEffectCallback返回值）指向永远唯一，但其中的fn会按照你的依赖项进行变化

​	

- 如何使用

```tsx
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
  // const handleSubmit = useEffectCallback(
  //   (c) => {
  //     console.log(`Text: ${text + c}`);
  //   },
  //   [text]
  // );

  // 利用ref存储state绕过依赖项检查
  const handleSubmit = useCallback((e) => {
    console.log(`Text: ${temp.current}${e}`);
  }, []);

  // 裸奔状态，本demo中类似于callback依赖 text
  // const handleSubmit = () => console.log(`Text: ${text}`)

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
```



## API

> 先来看下接受的参数

```typescript
// 和useCallback接收参数相同,其中的依赖项其实就是 any[]
type props = {
  fn: React.EffectCallback,
  dep: React.DependencyList
};
```

> 再来看看返回值

```js
return {
  func: useCallback函数
}
```

## 业务使用

子组件只依赖回调函数
