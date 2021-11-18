/**
 * @file teachdemos示例入口
 * @author caifeng01
 */
import { Table } from "antd";
import { Link } from "react-router-dom";

const dataSource = [
  {
    name: "MemoDemo",
    describe: "级联下拉钩子",
    url: "MemoDemo"
  },
  {
    name: "UseEffectDemo",
    describe: "级联下拉钩子",
    url: "UseEffectDemo"
  }
];

const columns = [
  {
    title: "简介",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "keywords",
    dataIndex: "keywords",
    key: "keywords"
  },
  {
    title: "demo",
    dataIndex: "url",
    key: "url",
    render: (url: string) => <Link to={`/teachdemo/${url}`}>点击查看</Link>
  }
];

const Introduction = () => (
  <>
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      业务与日常学习中学到的东西，制作成demo教学分享给大家
      <a target="_blank" href="https://github.com/caifeng123/cchooks">
        issues
      </a>
      中提出宝贵建议
    </div>
    <Table rowKey="url" columns={columns} dataSource={dataSource} />
  </>
);

export default Introduction;
