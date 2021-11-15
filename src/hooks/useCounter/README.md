## 适用场景

> 计数钩子

例如：

- 有页面需要记录点击次数，显示不同的情况
- 当一个页面需要多个计数器时，会将状态搞得特别多繁杂，因此使用钩子将增减赋值变为函数形式调用，简洁+减少代码量
- 设置边界值、step 值，无需在书写其他逻辑时反复查看

## demo

![chrome-capture (6)](<https://raw.githubusercontent.com/caifeng123/pictures/master/chrome-capture%20(6).gif>)

- 简介

1、可通过设置不同的自增/自减步长 - 修改当前值（会被 最大最小值限制）

2、可 reset 值为默认值

3、可通过 set 设置值 一样会被 最大最小值限制

- 如何使用

```tsx
export default () => {
  const ref = useRef<any>();
  const [current, { inc, dec, set, reset }] = useCounter(20, {
    min: 15,
    max: 25
  });

  const handleSet = () => set(ref.current.value);
  return (
    <>
      <div>值：{current}（默认20 限制[15~25] ）</div>
      <button onClick={() => inc(2)}>自增步长2</button>
      <button onClick={() => inc(5)}>自增步长5</button>
      <button onClick={() => dec(1)}>自减步长1</button>
      <button onClick={() => dec(4)}>自减步长4</button>
      <button onClick={() => reset()}>reset</button>
      <br />
      <input ref={ref} />
      <button onClick={handleSet}>set</button>
    </>
  );
};
```

## API

> 先来看下接受的参数

```typescript
type props = {
  // 初始化值
  initialValue: number;
  // 最大最小边界值
  options?: {
    min: number;
    max: number;
  };
};
```

> 再来看看返回值

```js
/**
 * current - 当前计数器的值
 * actions: {
 *   inc: 增加计数器e步长,
 * 	 dec: 减少计数器e步长,
 *   set: 设置计数器的值,
 *   reset: 重置为初始值
 * }
 */

return [
  (current: number),
  (actions: {
    inc: ((e) => number) => void,
    dec: ((e) => number) => void,
    set: ((e) => number) => void,
    reset: () => void
  })
];
```

## 业务使用

计数/计数器/数值累计
