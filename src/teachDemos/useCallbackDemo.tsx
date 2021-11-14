import * as React from "react";
import { Table, notification, Select, Input, Button } from "antd";
import useSetState from "../hooks/useSetState/useSetState";

const NOPAGINATION = { pageNo: 1, pageSize: 99 };
const initConfig = [
  {
    key: "sourceId",
    value: "",
    options: [],
    api: (e) => Promise.resolve({ res: [1, 2, 3] }),
    otherParams: NOPAGINATION
  },
  {
    key: "stationId",
    value: "",
    options: [],
    api: (e) => Promise.resolve({ res: [4, 5, 6] }),
    otherParams: NOPAGINATION
  }
];

const SourceStationSelect = () => {
  const [allSelects, setAllSelects] = useSetState(initConfig);
  const handleChange = (index, e) => {
    if (index < allSelects.length - 1) {
      const current = allSelects[index];
      const next = allSelects[index + 1];
      const { otherParams } = current;
      const { api } = next;
      const allData = allSelects.reduce((all, pre) => {
        all[pre.key] = pre.value;
        return all;
      }, {});
      api({ ...otherParams, ...allData, [current.key]: e })
        .then(({ res }) =>
          setAllSelects({
            [`${index + 1}.options`]: res,
            [`${index}.value`]: e
          })
        )
        .catch((ex) => notification.error({ message: ex.message }));
    } else {
      setAllSelects({ [`${index}.value`]: e });
    }
  };
  React.useEffect(() => {
    if (allSelects.length) {
      const { api, otherParams = {} } = allSelects[0];
      api?.(otherParams)
        .then(({ res }) => setAllSelects({ [`0.options`]: res }))
        .catch((ex) => notification.error({ message: ex.message }));
    }
  }, []);
  return (
    <>
      {allSelects.map(({ value, options, key }, index) => (
        <Select
          placeholder="请选择热源"
          value={value}
          key={key}
          onChange={(e) => handleChange(index, e)}
        >
          {options.map((value) => (
            <Select.Option value={value} key={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      ))}
    </>
  );
};

export default SourceStationSelect;
