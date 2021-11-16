## 适用场景

> 对setstate的增强钩子

Introduction：

- 时常我们会有一个大的state去存储数据，但有时只需要修改其中的一小部分

  - 例如：` const [c, setC] = useState({a:[{b:2}]})` 需要修改2为10时 怎么办呢?

    ```js
    setC(tempC => {
    	const c = _.clone(tempC);
    	c.a[0].b = 10;
    	return c;
    })
    ```

  - 由此可见，丑陋且极其容易出错，当要修改的东西不是我们能控制的呢？让人头疼不已，比如

    ```
    c 此时要变成 {a:[{d:2, c:3, b:1},{a:1},10]} // 是不是想着只能直接把a替换成想要的
    ```

- 说完问题来看看设想

  - class组件的 setState 真香~ 要是我们也能使用就好了
  - 有时候我想只想通过组合字符串的形式改变例如  `setSetState({"c.a.0.b": 10})` 那该多好

- 砰~ setSetState 横空出世

## demo

![setSetState](https://raw.githubusercontent.com/caifeng123/pictures/master/setSetState.gif)

- demo共赏，来看看做了啥

  1、直接通过 `{ area: 当前时间 } ` 直接修改 `state.area`  ,其他保留不变

  2、通过 `{ name: { hah: 1 } }`  直接修改 `state.name.hah`  ,其他保留不变

  3、通过字符串形式作为key `{"name.hah": 当前时间 }`  直接修改 `state.name.hah`  ,其他保留不变

  4、当然我最爱的回调函数形式也要有 `(c) => ({ ...c, age: 10 })` 此和setState保证一致

  5、通过 `{"0": { c: 2 }}` 数组索引下标修改

- 回到开头的问题

> 例如：` const [c, setC] = useState({a:[{b:2}]})` 需要修改2为10时 怎么办呢?

使用setSetState怎么解决呢

```tsx
const [c, setC] = useSetState({a:[{b:2}]});
setC({'a.0.b': 10});
```

以这种形式还是无法解决第二个疑问呀？别急 这就来看看当动态变化时怎么办

```js
const [c, setC] = useSetState({a:[{b:2}]});
setC({[`a.${index}.${finalItem}`]: 10});
```

使用动态模板字符串就迎刃而解啦 快来试试看	

- 如何使用

```tsx
export default () => {
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
```



## API

> 先来看下接受的参数

```typescript
// 无话可说，强行解说，和setState相同的initialValue。。。
props {
	initialValue: T	
};
```

> 再来看看返回值

```ts
// 着重看下setState，接收参数为回调函数/对象形式数据/深层对象数据等
return {
	readonly [
  	state: T,
		setState: (data: Record<string, any> | ((da: T) => T)) => void 
  ]
}
```

## 业务使用

子组件只依赖回调函数