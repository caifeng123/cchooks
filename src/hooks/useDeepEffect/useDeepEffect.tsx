/**
 * @file 依赖深比较useEffect钩子
 * @author caifeng01
 */

import { useEffect } from "react";
import { KeepDepth } from "../util";

const useDeepEffect = (fun: React.EffectCallback, dep: Array<any>) => {
  useEffect(fun, KeepDepth(dep));
};

export default useDeepEffect;
