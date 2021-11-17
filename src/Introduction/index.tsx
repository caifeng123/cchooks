/**
 * @file 简介索引
 * @author caifeng
 */
import { memo, useRef } from "react";
import { CarouselRef } from "antd/lib/carousel";
import { Carousel } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import CChooks from "./cchooks";
import TeachDemos from "./teachdemos";
import { useCounter } from "../hooks";

const config = {
  CCHOOKS: <CChooks />,
  TEACHDEMOS: <TeachDemos />
};

const configArr = Object.keys(config);

const Temp = memo(
  ({
    carouselRef
  }: {
    carouselRef: React.MutableRefObject<CarouselRef | null | undefined>;
  }) => (
    <Carousel arrows ref={(ref) => (carouselRef.current = ref)}>
      {Object.values(config).map((item) => item)}
    </Carousel>
  )
);

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
      <Temp carouselRef={carouselRef} />
    </>
  );
};
