/**
 * @file 简介索引
 * @author caifeng
 */
import { useRef } from "react";
import { CarouselRef } from "antd/lib/carousel";
import { Carousel } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import CChooks from "./cchooks";
import { useCounter } from "../hooks";

const config = {
  CCHOOKS: <CChooks />,
  TEACHDEMOS: <CChooks />
};

const configArr = Object.keys(config);

export default () => {
  const carouselRef = useRef<CarouselRef | null>();
  const [number, { inc, dec }] = useCounter(0, {
    min: 0,
    max: configArr.length - 1
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          fontSize: 20,
          color: "#108cee",
          fontWeight: 500
        }}
      >
        <CaretLeftOutlined
          style={{ fontSize: 30 }}
          onClick={() => {
            carouselRef.current?.prev();
            dec(1);
          }}
        />
        <div>{configArr[number]}</div>
        <CaretRightOutlined
          style={{ fontSize: 30 }}
          onClick={() => {
            carouselRef.current?.next();
            inc(1);
          }}
        />
      </div>
      <Carousel arrows ref={(ref) => (carouselRef.current = ref)}>
        {Object.values(config).map((item) => item)}
      </Carousel>
    </>
  );
};
