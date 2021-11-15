## 适用场景

> 并发钩子

例如：

- 在多个图表时常会要求分多个 api 进行调用请求，但相互没有关联（或有相同请求参数 - 例如时间）

- 当依赖项频繁变化，导致请求反复发出页面不停跳动的情况，只会渲染最后一次返回的 response

  - promise 并行写，会因为返回时间不同导致多次 setState 页面反复跳动

  - 使用 promise 回调会出现回调地域

  - 使用 await 会导致请求呈现阶梯形

    > 例如下方代码：
    >
    > 当 a 请求返回后才会发出 b
    >
    > ```js
    > await a;
    > await b;
    > ```

  - 使用 promise.all 会因为个别请求 reject，无法得到其他值

  - 最终基于 promise.allSettled 封装

    > 但由于 promise 无法 abort 请求，只能通过『之前 promise 回调不渲染』实现『只渲染最后一次』的效果（useRef 的妙用）

## demo

![chrome-capture (4)](<https://raw.githubusercontent.com/caifeng123/pictures/master/chrome-capture%20(4).gif>)

- 简介

1、默认只发一次请求，可以通过依赖 dep 的改变控制重新请求

2、当一组请求还未返回，发出另一组请求，不会重新渲染，只会渲染最后一次。

3、对返回值进行特殊处理，可以统一处理 、 也可省略全部返回

4、reload 重新发出请求函数

- 如何使用

```tsx
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

export default () => {
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
```

## API

> 先来看下接受的参数

```ts
type props = {
  // 请求的promises
  apis: Array<(...args: any[]) => Promise<any>>;
  // promises对应的各个请求参数，*和promises一一对应*
  params?: any[];
  // 对请求返回值的处理（可写单个统一处理 / 也可写成*和promises一一对应*）
  filter?: Array<((data: any) => any) | undefined> | ((data: any) => any);
  // 依赖项*和promises一一对应*
  dep?: any[];
};
```

> 再来看看返回值

```js
/**
 * res - 请求返回数组
 * failNumber - 请求失败数量
 * reload - 重新请求函数
 */

return {
  res: Array<any>;
  failNumber: number;
  reload: () => void;
}
```

## 业务使用

多 api 正交并发
