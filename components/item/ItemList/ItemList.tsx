import { List } from "antd";
import { SubItem } from "types/item";

type ItemListProps = {
  subItems: SubItem[];
  
}

export default function ItemList({subItems}: ItemListProps) {
  return (
    <List
      size="large"
      dataSource={subItems}
      renderItem={item => <List.Item>{item.name}</List.Item>}
    />
  );
}
