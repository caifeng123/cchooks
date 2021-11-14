/**
 * @description
 * 上demo
 * 对象 可以指向单个目标 公用
 * 下demo
 * useRef 多个组件调用渲染都会是不同 无法指向同一个
 */

// import { a } from "./constent";
// export default () => {
//   return (
//     <div
//       onClick={() => {
//         a[2] = 3;
//         console.log(a);
//       }}
//     >
//       {JSON.stringify(a)}
//     </div>
//   );
// };

import { B } from "./constent";
export default () => {
  const a = B();
  return (
    <div
      onClick={() => {
        console.log(a);
      }}
    >
      {JSON.stringify(a)}
    </div>
  );
};
