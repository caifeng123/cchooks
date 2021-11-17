## 适用场景

> 当对象/数组不想因为其他state改变导致的组件渲染反复重新生成新的对象指针 （memo时需要减少变化）时使用

Introduction：

- 我们来想象一下

  - 页面有2个state - text,number 任意一个state变化就会导致页面重新渲染
  - 此时我们有个子组件依赖对象obj ,obj每次刷新都会生成全新组合的对象
  - 此时 <ExpensiveTree/> 已经被memo包裹，对memo不熟悉的请看 [memo教程]()

  ```tsx
  export default () => {
      const [text, updateText] = useState("Initial value");
      const [number, { inc }] = useCounter(0);
  
      return (
          <>
              <input
                value={text}
                onChange={(e) => {
                  updateText(e.target.value);
                }}
              />
              <ExpensiveTree obj={{a: 2, number}} />
              <button onClick={() => inc(1)}>number+1</button>
          </>
      );
  }
  ```

- 那么由于props （也就是obj）频繁变化会导致 <ExpensiveTree/> 组件的频繁变化，当其他无关state变化时，实际上我是不希望他变化，也不希望  <ExpensiveTree/> 重新渲染的
- 砰~ useDeepValue 横空出世

## demo

- 使用useDeepValue

![useDeepValue](https://raw.githubusercontent.com/caifeng123/pictures/master/useDeepValue.gif)

- 不使用useDeepValue

![notusedeepvalue](https://raw.githubusercontent.com/caifeng123/pictures/master/notusedeepvalue.gif)

> 观察下有什么区别

1、不使用useDeepValue：当我在给输入框疯狂填值的时候，子组件也会随之刷新，导致渲染变慢卡顿

2、使用useDeepValue：输入框及时响应

- 如何使用

```tsx
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
}
```



## API

> 先来看下接受的参数

```typescript
// 任意复杂类型（基本类型没必要用）
type props = {
		value: T
};
```

> 再来看看返回值

```js
// 深比较是否有变化
return {
	value: T
}
```

## 业务使用

memo包裹依赖的复杂类型