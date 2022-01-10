import { Button } from "antd";
import { Table } from 'antd';


export default function ItemList(props: any) {
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      hidden: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: any) => '$'+ text,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text:any, record:any) => (
        <Button type="primary" onClick={e => handleUpdateCart(record)}>Add</Button>
      )
    },
  ].filter(item => !item.hidden);;

  const handleUpdateCart = (item: any) => {
    props.updateCart(item.code);
  };


  return (
    <Table columns={columns} dataSource={props.subItems} />
  );
}
