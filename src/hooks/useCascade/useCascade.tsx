/**
 * @file useCascade 钩子实现
 * @author caifeng01
 */

import { useState, useCallback } from "react";
import useDeepEffect from "../useDeepEffect/useDeepEffect";

const useCascade = <T extends {}>(
  initalArr: T[] = [],
  escapeEmpty: boolean = false
) => {
  const [data, setData] = useState<T[]>(initalArr);
  const setVal = useCallback(
    (ind: number, val: T) => {
      setData((temp) => {
        const data = temp.slice(0, ind + (escapeEmpty ? +!!val : 1));
        data[ind] = val;
        return data;
      });
    },
    [escapeEmpty]
  );
  const reload = () => setData(initalArr);
  useDeepEffect(() => setData(initalArr), [initalArr]);
  return [data, setVal, reload] as const;
};

export default useCascade;
