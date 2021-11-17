/**
 * @file 示例入口
 * @author caifeng01
 */

import React from "react";
import {
  DemoHeader,
  UseCascadeDemo,
  UseConcurrentDemo,
  UseCounterDemo,
  UseDeepEffectDemo,
  UseDeepValue,
  UseEffectCallbackDemo,
  UseRequestDemo,
  UseSetStateDemo
} from "./hooks/demoIndex";
import { MemoDemo } from "./teachDemos/demoIndex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./Introduction";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/cchooksdemo" element={<DemoHeader />}>
            <Route path="UseSetStateDemo" element={<UseSetStateDemo />} />
            <Route path="UseDeepValue" element={<UseDeepValue />} />
            <Route path="UseConcurrentDemo" element={<UseConcurrentDemo />} />
            <Route path="UseCascadeDemo" element={<UseCascadeDemo />} />
            <Route path="UseCounterDemo" element={<UseCounterDemo />} />
            <Route path="UseDeepEffectDemo" element={<UseDeepEffectDemo />} />
            <Route
              path="UseEffectCallbackDemo"
              element={<UseEffectCallbackDemo />}
            />
            <Route path="UseRequestDemo" element={<UseRequestDemo />} />
          </Route>
          <Route path="/teachdemo" element={<DemoHeader />}>
            <Route path="MemoDemo" element={<MemoDemo />} />
            <Route path="UseConcurrentDemo" element={<UseConcurrentDemo />} />
            <Route path="UseCascadeDemo" element={<UseCascadeDemo />} />
            <Route path="UseCounterDemo" element={<UseCounterDemo />} />
            <Route path="UseDeepEffectDemo" element={<UseDeepEffectDemo />} />
            <Route
              path="UseEffectCallbackDemo"
              element={<UseEffectCallbackDemo />}
            />
            <Route path="UseRequestDemo" element={<UseRequestDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
