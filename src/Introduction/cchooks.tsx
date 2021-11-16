/**
 * @file cchooks示例入口
 * @author caifeng01
 */
import { Table } from "antd";
import { Link } from "react-router-dom";

const dataSource = [
  {
    name: "UseCascadeDemo",
    describe: "级联下拉钩子",
    url: "UseCascadeDemo"
  },
  {
    name: "UseConcurrentDemo",
    describe: "并发钩子",
    url: "UseConcurrentDemo"
  },
  {
    name: "UseCounterDemo",
    describe: "快捷管理数数钩子",
    url: "UseCounterDemo"
  },
  {
    name: "UseDeepEffectDemo",
    describe: "深检查effect钩子",
    url: "UseDeepEffectDemo"
  },
  {
    name: "UseEffectCallbackDemo",
    describe: "callback单独依赖钩子",
    url: "UseEffectCallbackDemo"
  },
  {
    name: "UseRequestDemo",
    describe: "远程请求钩子",
    url: "UseRequestDemo"
  },
  {
    name: "UseSetStateDemo",
    describe: "useState升级钩子",
    url: "UseSetStateDemo"
  }
];

const columns = [
  {
    title: "钩子名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "钩子描述",
    dataIndex: "describe",
    key: "describe"
  },
  {
    title: "demo",
    dataIndex: "url",
    key: "url",
    render: (url: string) => <Link to={`/demo/${url}`}>点击查看</Link>
  }
];

const Introduction = () => (
  <>
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      业务开发时为节约开发效率，自己造的轮子,有问题请在
      <a target="_blank" href="https://github.com/caifeng123/cchooks">
        issues
      </a>
      中提出宝贵建议
    </div>
    <Table rowKey="url" columns={columns} dataSource={dataSource} />
  </>
);

export default Introduction;
