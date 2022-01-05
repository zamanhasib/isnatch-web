import { List } from "antd";

export default function ItemList({subItems}) {
  return (
    <List
      size="large"
      dataSource={subItems}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
}
