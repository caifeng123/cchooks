/**
 * @file useRequest Demo
 * @author caifeng01
 */

import useCounter from "../useCounter/useCounter";
import useRequest from "./useRequest";
import useSetState from "../useSetState/useSetState";

const api =
  "https://mobile-ms.uat.homecreditcfc.cn/mock/61499c0d646d610027843a09/example/query";
const useRequestDemo = () => {
  const [params, setParams] = useSetState({ name: [1], age: 2 });
  const [number, { inc, dec, set }] = useCounter(1, { min: -10, max: 20 });
  const deps = Object.values(params);
  const { data, error, loading } = useRequest<string[]>({
    api,
    params,
    dep: [number, deps]
  });
  return (
    <>
      {number + JSON.stringify(params)}
      <button onClick={() => inc()}>+</button>
      <button onClick={() => dec()}>-</button>
      <button onClick={() => set(2)}>set to 2</button>
      <button onClick={() => setParams({ name: params.name.concat(1) })}>
        setParams
      </button>
      {loading ? "loading" : ""}
      <br />
      {JSON.stringify(data)}
    </>
  );
};

export default useRequestDemo;
