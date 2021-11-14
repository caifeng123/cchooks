/**
 * @file useTable Demo
 * @author caifeng01
 */
import useTable from "./useTable";
import { Table, Input, Button } from "antd";
import { useCallback } from "react";
import _ from "lodash";

const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "locationName",
    dataIndex: "locationName"
  },
  {
    title: "area",
    dataIndex: "area"
  },
  {
    title: "regionName",
    dataIndex: "regionName"
  }
];

const useTableDemo = () => {
  const {
    result,
    loading,
    reload,
    setQueryParams,
    setPagination,
    pagination
  } = useTable({
    url:
      "https://mock.mengxuegu.com/mock/614af0471d03800abd3ef506/example/getheat",
    initParams: {
      age: "",
      name: ""
    },
    initPagination: {
      current: 99,
      pageSize: 10
    },
    initpageConfig: {
      names: ["current", "pageSize", "total"],
      values: [1, 10]
    }
  });
  const handleInput = useCallback(
    (name) =>
      _.debounce((e) => setQueryParams({ [name]: e.target.value }), 500),
    []
  );
  return (
    <>
      <Button onClick={reload}>刷新</Button>
      <br />
      搜索name：
      <Input onChange={handleInput("name")} />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={result}
        pagination={pagination}
        loading={loading}
        onChange={setPagination}
      />
    </>
  );
};

export default useTableDemo;
