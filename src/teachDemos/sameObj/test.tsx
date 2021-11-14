import { Button } from "antd";
import { useState } from "react";
import A from "./a";
import B from "./b";

export default () => {
  const [state, setState] = useState(true);
  const [state1, setState1] = useState(true);
  return (
    <>
      {state && <A />}
      <Button onClick={() => setState(!state)}>点我切换A</Button>
      {state1 && <B />}
      <Button onClick={() => setState1(!state1)}>点我切换B</Button>
    </>
  );
};
