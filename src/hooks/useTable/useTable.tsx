/**
 * @file useTable 钩子实现
 * @author caifeng01
 */

import _ from "lodash";
import { useCallback } from "react";
import useRequest from "../useRequest/useRequest";
import useSetState from "../useSetState/useSetState";

type InitPageConfigProps = {
  // 数组 分别是 当前页，页面大小，总量关键字
  names: ["current" | "pageNo", "pageSize", "total" | "totalCount"];
  // [初始页码,每页条数]
  values: [number, number];
};

interface useTableProps {
  // 请求table的url
  url: string;
  // 初始筛选参数
  initParams?: Record<string, string>;
  // 分页器初始状态
  initPageConfig?: InitPageConfigProps;
  initPagination?:
    | {
        // 当前页面
        current: number;
        // 页面大小
        pageSize: number;
      }
    | {};
}

const getConfigMap = (initPageConfig?: InitPageConfigProps) => {
  if (initPageConfig) {
    const { names, values } = initPageConfig;
    const [current, pageSize, totalCount] = names;
    const [currentVal, pageSizeVal] = values;
    const pageConfig = {
      [current]: currentVal,
      [pageSize]: pageSizeVal
    };
    return [pageConfig, { current, pageSize, totalCount }];
  }
  return [{}, {}];
};

const useTable = ({
  url,
  initParams = {},
  initPagination = {},
  initPageConfig
}: useTableProps) => {
  const [pageConfig, { current, pageSize, totalCount }] = getConfigMap(
    initPageConfig
  );
  const [param, setParam] = useSetState({
    ...initParams,
    ...pageConfig
  });
  /**
   * 修改筛选条件（当修改条件时 自动变为第一页）
   */
  const setQueryParams = (params: Record<string, any>) => {
    if (current) {
      setParam({ ...params, [current]: 1 });
    }
  };
  /**
   * 切换分页器（当页面大小变化时 自动变为第一页）
   */
  const setPagination = useCallback((tempPagination) => {
    setParam((param: any) =>
      tempPagination[pageSize] === param[pageSize]
        ? { ...param, ...tempPagination }
        : { ...param, ...tempPagination, [current]: 1 }
    );
  }, []);
  const {
    data: { data, ...rest },
    loading,
    reload
  } = useRequest({
    api: url,
    params: param,
    options: {
      method: "GET"
    },
    dep: Object.values(param)
  });
  const pagination = _.pick(param, initPageConfig?.names || []);
  return {
    data,
    loading,
    reload,
    pagination: { ...pagination, ...rest },
    setQueryParams,
    setPagination
  };
};

export default useTable;
