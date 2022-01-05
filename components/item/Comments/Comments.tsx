import { Avatar, List } from "antd";
const data = [
  {
    title: 'Customer A',
  },
  {
    title: 'Customer B',
  },
  {
    title: 'Customer C',
  },
  {
    title: 'Customer D',
  },
];
export default function Comments() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="customer comment coming soon"
          />
        </List.Item>
      )}
    />
  );
}
