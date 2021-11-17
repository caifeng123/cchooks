/**
 * @file useDeepValue钩子实现
 * @author caifeng01
 * @description 保证复杂数据类型值不变时不会变动
 */
import _ from "lodash";
import { useRef } from "react";

const useDeepValue = <T extends {}>(value: T) => {
  const ref = useRef<T>();
  if (!_.isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export default useDeepValue;
