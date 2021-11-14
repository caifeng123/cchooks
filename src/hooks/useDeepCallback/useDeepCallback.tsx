/**
 * @file 依赖深比较useCallback钩子
 * @author caifeng01
 */

import { useCallback } from "react";
import { KeepDepth } from "../util";

const useDeepCallback = (fun: React.EffectCallback, dep: Array<any>) => {
  return useCallback(fun, KeepDepth(dep));
};

export default useDeepCallback;
