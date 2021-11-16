/**
 * @file useEffectCallback钩子实现
 * @author caifeng01
 * @description 依赖项会修改函数 但指向还是唯一
 */
import { useCallback, useEffect, useRef } from "react";

const useEffectCallback = (
  fn: (...args: any[]) => any,
  dep: React.DependencyList
) => {
  const ref = useRef<((...args: any[]) => any) | null>(null);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dep]);

  return useCallback((...args) => ref.current && ref.current(...args), []);
};

export default useEffectCallback;
