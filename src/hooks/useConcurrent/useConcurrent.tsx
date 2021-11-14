/**
 * @file useConcurrent 钩子实现
 * @author caifeng01
 */

import { useEffect, useState } from "react";
import _ from "lodash";

type UseConcurrentProps = {
  apis: ((...args: any[]) => void)[];
  params: any[];
  filter: ((data: any) => any)[] | ((data: any) => any);
};
type AnsProps = {
  res: Array<any>;
  failNumber: number;
};

const useConcurrent = ({
  apis,
  params,
  filter
}: UseConcurrentProps): AnsProps => {
  const [ans, setAns] = useState<AnsProps>({ res: [], failNumber: 0 });

  useEffect(() => {
    Promise.allSettled(apis.map((api, index) => api(params[index]))).then(
      (res: any[]) => {
        let num = 0;
        const allData = res.map(({ status, value, reason }, index) => {
          if (status === "rejected") {
            // do rejected thing
            num++;
          }
          return _.isFunction(filter)
            ? filter(value)
            : filter[index]?.(value) || value;
        });
        setAns({ res: allData, failNumber: num });
      }
    );
  }, []);

  return ans;
};

export default useConcurrent;
