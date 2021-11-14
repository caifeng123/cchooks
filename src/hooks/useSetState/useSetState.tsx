/**
 * @file useSetState 钩子实现
 * @author caifeng01
 */

/**
 * 对setstate的增强函数
 * 1、能直接赋值单独属性 形如class 的 setState
 * 2、能对深度对象进行改变数据 如setA({"name.hah": 2})
 * 3、能像原始的setState使用回调函数进行赋值
 */

import _ from "lodash";
import { useCallback, useState } from "react";

// 添加Record 为了按链式path修改属性
type DataProps = Record<string, any>;

const useSetState = <T extends {}>(initialValue: T) => {
  const [current, setCurrent] = useState(initialValue);
  const setState = useCallback((data: DataProps | ((da: T) => T)) => {
    setCurrent((cur) => {
      // 回调函数直接执行
      if (_.isFunction(data)) {
        return data(cur);
      }
      // 否则按链式赋值
      const ans = _.clone(cur);
      _.map(data, function (value, key) {
        _.set(ans, key, value);
      });
      return ans;
    });
  }, []);
  return [current, setState] as const;
};

export default useSetState;
