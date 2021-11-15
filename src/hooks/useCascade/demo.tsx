import { Button, Input } from "antd";
import { useState } from "react";
import useCascade from "./useCascade";

const arr = new Array(5).fill("");

const useCascadeDemo = () => {
  const [state, setState] = useState([12, 123]);
  // setCascade 直接设置第几项的值即可
  const [cascade, setCascade, reload] = useCascade(state, true);
  return (
    <>
      - 级联输入框，只有当前面被输入才会开放修改后面的值
      <br />
      - 当前面的值被修改时，会将后面的所有值清空
      <br />
      - tips:escapeEmpty 为true 则 当删减为空字符串将会删除当前值 等同于
      undefined
      <br />
      <br />
      存储值：{JSON.stringify(cascade)}
      <br />
      <Button onClick={reload}>reload</Button>
      <Button onClick={() => setState([11, 1, 123])}>changeInit</Button>
      <br />
      {arr.map((c, i) => (
        <Input
          key={i}
          style={{ width: 120, margin: "10px" }}
          value={cascade[i]}
          disabled={!!i && !cascade[i - 1]}
          onChange={(e) => setCascade(i, e.target.value)}
        />
      ))}
    </>
  );
};

export default useCascadeDemo;
