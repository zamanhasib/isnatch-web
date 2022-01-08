import { Button, List } from "antd";

import { Table, Tag, Space } from 'antd';


export default function ItemCart(props: any) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render: (text: number, record: any) =>(
        <Space>
          <Button type="primary" shape="circle" onClick={e => minusItem(record)}>-</Button>
          {text}
          <Button type="primary" shape="circle" onClick={e => addItem(record)}>+</Button>
        </Space>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const addItem = (item: any) => {
    props.addItem(item.code);
  };

  const minusItem = (item: any) => {
    props.minusItem(item.code);
  };

  return (
    <Table columns={columns} dataSource={props.cartItems} pagination={false}/>
  );
}
