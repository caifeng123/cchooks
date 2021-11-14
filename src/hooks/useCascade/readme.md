## 适用场景

> 级联是很常见的场景~~
>
> 为符合正交设计思想（ui 和 state 解耦）专为级联 state 设计

例如：

- 在买机票时，需要依次选择从哪个国家、哪个城市和哪个地区或者哪个机场选择出发地点。
- 只有填写完学历后才能显示填写对应难度的题目等

## demo

![UseCascadeDemo](<https://raw.githubusercontent.com/caifeng123/pictures/master/chrome-capture%20(2).gif>)

- 专注看钩子做了什么事情（对监管的数据做了什么事情）

1、可赋予初始值进行初始化

2、当输入对应框的数据，改变对应数组的位置的值

3、修改当前值会将后面的值全部清空

> 举个例子来说：
>
> 当前选择 **中国 -》上海**
>
> 我此时将 **中国** 换成 **德国** 那么 **上海** 这个值就无效了应该被清空

4、reload 重置为初始值

- 如何使用

```tsx
const arr = new Array(5).fill("");

export default () => {
  const [cascade, setCascade, reload] = useCascade(["12"]);
  return (
    <>
      {arr.map((c, i) => (
        <Input
          style={{ width: 120, margin: "10px" }}
          value={cascade[i]}
          disabled={!!i && !cascade[i - 1]}
          onChange={(e) => setCascade(i, e.target.value)}
        />
      ))}
      <Button onClick={reload}>reload</Button>
    </>
  );
};
```

## API

> 先来看下接受的参数

```ts
type {
  /**
  * 1、初始化级联数据
  * 2、当级联数据通过fetch返回时，会检测到并进行替换
  * 		- 基于useDeepEffect检测 - 详情请看useDeepEffect钩子
  */
  initalArr?: T[]
  /**
  * 控制-当输入为""时 是否能解锁下一层
  * default-不忽略空字符
  * 场景：下拉框让用户选择 全部xx 时，传给后端实际是空字符串/不传
  */
  escapeEmpty: boolean = false	// ts4.0版本后的写法 有了默认值无需添加?作为可选参数，自动推断为可选
}
```

> 再来看看返回值

```js
/**
 * cascade - 级联值
 * setCascade - 设置某一项级联值
 * reload - 重新将cascade设置为默认值
 */

return [
  cascade: T[],
  setCascade: (index: number, val: T) => void,
  reload: () => void;
] as const;
```

## 业务使用

级联下拉框组件
