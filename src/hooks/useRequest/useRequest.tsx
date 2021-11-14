/**
 * @file useRequest钩子实现
 * @author caifeng01
 */

import { useCallback, useState } from "react";
import useDeepEffect from "../useDeepEffect/useDeepEffect";

interface useRequestProps<T> {
  // api接口函数
  api: ((...args: Array<any>) => Promise<any>) | string;
  // fetch参数
  options?: RequestInit;
  // 默认值
  defaultValue?: T;
  // 参数数组值
  params?: Record<string, any>;
  // 依赖项
  dep?: Array<any>;
  // 数据处理函数
  dealwithData?: (res: T) => any;
  // 前提函数（满足条件后后发请求）
  preFunc?: (...params: Array<any>) => boolean;
}

interface fetchDataProps {
  api: string;
  options: RequestInit;
  params?: Record<string, string>;
}

const defaultDealwithData = (res: any) => res;
const defaultPreFunc = (...params: Array<any>) => true;
const defaultOptions = { method: "GET" };

const createParams = (obj: Record<string, string>) => {
  const params = Object.keys(obj)
    .map((now) => `${now}=${obj[now]}`)
    .join("&");
  return `?${params}`;
};

const fetchData = async ({ api, options, params = {} }: fetchDataProps) => {
  const data = await fetch(api + createParams(params), options);
  return data.json();
};

const useRequest = <T extends {}>({
  api,
  defaultValue = {} as T,
  params = {},
  options = defaultOptions,
  dep = [],
  dealwithData = defaultDealwithData,
  preFunc = defaultPreFunc
}: useRequestProps<T>) => {
  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loadData = useCallback(
    (param) => {
      setLoading(true);
      if (preFunc(param)) {
        (typeof api === "string"
          ? fetchData({ api, options, params: param })
          : api(param)
        )
          .then((res) => setData(dealwithData(res)))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }
    },
    [api, dealwithData, preFunc, options]
  );

  useDeepEffect(() => {
    loadData(params);
  }, dep);

  return {
    data,
    error,
    loading,
    reload: () => loadData(params)
  };
};

export default useRequest;
