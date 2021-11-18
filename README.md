# cchooks

> 业务开发时为节约开发效率，自己造的 hooks 在此分享记录

| 名称              | 作用                          | 举例                                                                                                                                                |
| ----------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| UseCascadeDemo    | 控制级联输入                  | 需要依次选择从哪个国家、哪个城市和哪个地区或者哪个机场选择出发地点。                                                                                |
| useConcurrent     | 处理并发请求                  | 在多个图表时常会要求分多个 api 进行调用请求，但相互没有关联                                                                                         |
| useCounter        | 数数钩子                      | 当一个页面需要多个计数器时，会将状态搞得特别多繁杂，因此使用钩子将增减赋值变为函数形式调用，简洁+减少代码量                                         |
| useDeepEffect     | useEffect 增强版              | 依赖项为复杂类型，数据庞大时使用                                                                                                                    |
| useEffectCallback | 保证唯一指向 usecallback 钩子 | 为 memo 包裹的厚重组件提供函数的唯一指向                                                                                                            |
| UseRequest        | 远程请求钩子                  | 简化请求操作                                                                                                                                        |
| UseSetState       | 对 setstate 的增强            | 1、能直接赋值单独属性 形如 class 的 setState<br>2、能对深度对象进行改变数据 如 setA({"name.hah": 2})<br>3、能像原始的 setState 使用回调函数进行赋值 |
| UseDeepValue      | 深比较值索引                  | 当对象/数组不想因为其他 state 改变导致的组件渲染反复重新生成新的对象指针 （memo 时需要减少变化）时使用                                              |

# teachdemos

> 对一些技术使用的总结和 demo 演示

| 名称      | 技术衍生                                                    |
| --------- | ----------------------------------------------------------- |
| memo      | useCallback，UseDeepValue，useEffectCallback                |
| useEffect | useDeepEffect，useEffectCallback，UseSetState，UseDeepValue |
