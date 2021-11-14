/**
 * @file 工具函数集
 * @author caifeng01
 */

import _ from "lodash";
import { useRef } from "react";

/**
 * 深检查依赖项 若完全相同返回相同地址
 * @param dep 依赖项数组
 */
export const KeepDepth = (dep: Array<any>) => {
  let lastdep = useRef<Array<any>>([]);
  if (!_.isEqual(dep, lastdep.current)) {
    lastdep.current = dep;
  }
  return lastdep.current;
};
