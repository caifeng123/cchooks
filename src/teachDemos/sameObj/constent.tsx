import { useRef } from "react";

export const a = {};

export const B = () => {
  const temp = useRef<Number>();
  if (!temp.current) {
    temp.current = Math.random();
  }
  console.log(temp.current);
  return temp.current;
};
