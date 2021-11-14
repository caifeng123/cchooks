/**
 * @file useConcurrent Demo
 * @author caifeng01
 */

import useConcurrent from "./useConcurrent";

const promise1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("1"), 1000);
  });
const promise2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject("2"), 2000);
  });
const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("3"), 3000);
  });

const useConcurrentDemo = () => {
  const { res, failNumber } = useConcurrent({
    apis: [promise1, promise2, promise3],
    params: [],
    filter: [(a) => +a, (a) => +a, (a) => +a]
  });
  // const res = [1,23]
  return (
    <>
      <div>{failNumber}</div>
      {JSON.stringify(res)}
    </>
  );
};

export default useConcurrentDemo;
