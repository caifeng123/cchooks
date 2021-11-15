/**
 * @file useConcurrent 钩子实现
 * @author caifeng01
 */

import { useState, useRef } from "react";
import useDeepEffect from "../useDeepEffect/useDeepEffect";

type UseConcurrentProps = {
  apis: Array<(...args: any[]) => Promise<any>>;
  params?: any[];
  filter?: Array<((data: any) => any) | undefined> | ((data: any) => any);
  dep?: any[];
};

type StateProps = {
  res: Array<any>;
  failNumber: number;
};

interface AnsProps extends StateProps {
  reload: () => void;
}

const useConcurrent = ({
  apis,
  params = [],
  filter = (e) => e,
  dep = []
}: UseConcurrentProps): AnsProps => {
  const [ans, setAns] = useState<StateProps>({ res: [], failNumber: 0 });
  const onceRef = useRef<number>();

  const fetch = () => {
    const temp = Math.random();
    onceRef.current = temp;
    Promise.allSettled(apis.map((api, index) => api(...params[index]))).then(
      (res: any[]) => {
        let num = 0;
        const allData = res.map(({ status, value, reason }, index) => {
          if (status === "rejected") {
            // do rejected thing
            num++;
            // return reason; - reject的值
            return {};
          }
          return typeof filter === "function"
            ? filter(value)
            : filter[index]?.(value) || value;
        });
        if (temp === onceRef.current) {
          setAns({ res: allData, failNumber: num });
        }
      }
    );
  };
  useDeepEffect(fetch, dep);

  return { ...ans, reload: fetch };
};
export default useConcurrent;
