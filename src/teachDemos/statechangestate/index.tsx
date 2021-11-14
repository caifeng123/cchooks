import { Button } from "antd";
import useSetState from "../../hooks/useSetState/useSetState";

const a = [
  {
    1: 2
  }
];
export default () => {
  const [b, setB] = useSetState(a);

  return (
    <>
      {JSON.stringify(a)}
      <Button onClick={() => setB({ "0.1": 3 })}>+</Button>
      {JSON.stringify(b)}
    </>
  );
};
