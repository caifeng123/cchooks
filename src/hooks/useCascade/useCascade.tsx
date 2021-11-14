/**
 * @file useCascade 钩子实现
 * @author caifeng01
 */

import { useState, useCallback } from "react";
import _ from "lodash";
import useDeepEffect from "../useDeepEffect/useDeepEffect";

const useCascade = <T extends {}>(
  initalArr?: T[],
  escapeEmpty: boolean = false
) => {
  const [data, setData] = useState<T[]>(initalArr || []);
  const setVal = useCallback(
    (ind: number, val: T) => {
      setData((data) => {
        data[ind] = val;
        return data.slice(0, ind + (escapeEmpty ? +!!val : 1));
      });
    },
    [escapeEmpty]
  );
  const reload = () => setData(initalArr || []);
  useDeepEffect(
    () => initalArr && setData(initalArr),
    _.clone(initalArr) ?? []
  );
  return [data, setVal, reload] as const;
};

export default useCascade;
