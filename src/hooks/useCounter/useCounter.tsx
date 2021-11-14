/**
 * @file useCounter钩子实现
 * @author caifeng01
 */

import { useCallback, useMemo, useState } from "react";

interface maxAndmin {
  min: number;
  max: number;
}

const useCounter = (initialValue: number, { min, max }: maxAndmin) => {
  const [current, setCurrent] = useState(initialValue);
  const setValidData = useCallback(
    (dataFunc: number | Function) => {
      setCurrent((cur) => {
        let finalData = typeof dataFunc === "number" ? dataFunc : dataFunc(cur);
        finalData = Math.max(finalData, min);
        finalData = Math.min(finalData, max);
        return finalData;
      });
    },
    [max, min]
  );
  const actions = useMemo(() => {
    const inc = (delta = 1) => setValidData((cur: number) => cur + delta);
    const dec = (delta = 1) => setValidData((cur: number) => cur - delta);
    const set = (e: number) => setValidData(+e);
    const reset = () => setValidData(initialValue);
    return {
      inc,
      dec,
      set,
      reset
    };
  }, [initialValue, setValidData]);
  return [current, actions] as const;
};

export default useCounter;
