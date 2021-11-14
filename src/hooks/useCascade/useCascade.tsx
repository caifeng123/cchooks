/**
 * @file useCascade 钩子实现
 * @author caifeng01
 */

import { useState } from "react";

const useCascade = (initalArr?: any[], escapeEmpty?: boolean) => {
  const [data, setData] = useState(initalArr || []);
  const setVal = (ind: number, val: any) => {
    if (ind <= data.length) {
      setData((data) => {
        data[ind] = val;
        return data.slice(0, ind + (escapeEmpty ? +!!val : 1));
      });
    }
  };
  const reload = () => setData(initalArr || []);
  return [data, setVal, reload] as const;
};

export default useCascade;
