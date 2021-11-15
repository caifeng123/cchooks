## 适用场景

> 深比较钩子

Introduction：

- 深比较和浅比较
  - useEffect实际上是对数组进行浅比较/一层比较
  - 对于useDeepEffect来说 可以对数据进行深比较
- 往往有时数据复杂，但又需要持续监听时
  - useEffect对于复杂类型无力
  - useDeepEffect应运而生

## demo

![chrome-capture (8)](https://raw.githubusercontent.com/caifeng123/pictures/master/chrome-capture (8).gif)

- 简介

1、在每次重新渲染时，就会重新调用生成新的deps

2、对于当前 变量 **deps** 来说 可观测到值为` deps = [["cc"], 12];`

3、对于useEffect中需要不停 setState时 会重复加载组件，生成新的 **deps** 变量

4、对于useEffect来说 `deps[0] = ["cc"]` 是个复杂类型，每次都会生成变量指向新的地址，认为依赖项变化

5、对于useDeepEffect来说，会深比较复杂类型 最终一直比到 "cc" 字符串值为相同，认为依赖项没变



- 如何使用

```tsx
export default () => {
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
```



## API

> 先来看下接受的参数

```typescript
// 和useeffect接收参数相同，唯一区别是dep可接受任意值组成的Array
type props = {
	fun: React.EffectCallback,
  dep: Array<any>
};
```

> 再来看看返回值

```js
void
```

## 业务使用

依赖项为复杂类型，数据庞大时使用
