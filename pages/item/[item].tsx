import { Layout } from "@components/common";
import styles from "../../styles/Home.module.css";
import { InferGetStaticPropsType } from "next";
import { CartItem, Item, SubItem } from "types/item";
import { getCustomer, getItem, savePayment } from "services/rewards";
import { Card, Col, message, Row, Space } from "antd";
import { ItemList, Comments, ItemCart, PaymentCard } from "@components/item";
import { useState } from "react";
import { Payment } from "types/payment";
import CONSTANTS from "@config/constants";
import { Customer } from "types/customer";
import { useRouter } from 'next/router'

export default function ItemPage({
  item, customer
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const selectedItem: Item = item;
  const activeCustomer: Customer = customer;
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function updateCart(newItemCode: string) {
    const items: CartItem[] = cartItems;
    const index = items.findIndex(element => element.code === newItemCode);
    if (index !== -1){
      const itemCount = items[index].count + 1;
      const itemTotalPrice = items[index].price * itemCount;
      items[index] = {...items[index], count: itemCount, total: itemTotalPrice};
    }
    else {
      const newSubItem: any = selectedItem.subItems.find(x => x.code === newItemCode); 
      newSubItem.count = 1;
      newSubItem.total = newSubItem.price;
      items.push(newSubItem);
    }
    setCartItems([...items]);
  }

  function addSubItem(subItemCode: string){
    const items: CartItem[] = cartItems;
    const index = items.findIndex(element => element.code === subItemCode);
    const itemCount = items[index].count + 1;
    const itemTotalPrice = items[index].price * itemCount;
    items[index] = {...items[index], count: itemCount, total: itemTotalPrice};
    setCartItems([...items]);
  }

  function minusSubItem(subItemCode: string){
    const items: CartItem[] = cartItems;
    const index = items.findIndex(element => element.code === subItemCode);
    const itemCount = items[index].count - 1;
    const itemTotalPrice = items[index].price * itemCount;
    items[index] = {...items[index], count: itemCount, total: itemTotalPrice};
    if (itemCount < 1) {
      items.splice(index, 1);
    }
    setCartItems([...items]);
  }

  async function proceedToPayment(payment: Payment){
    const output = await savePayment(payment);
    if (output) {
      message.success('Your payment is successful, enjoy your cashback $' + payment.cashbackSnatched.toFixed(2), 10);
      router.push("/");
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <p className={styles.description}>{selectedItem.name} offering {selectedItem.cashback}% cashback</p>
        <Row>
            <Col className={styles.section} flex={6}>
                <Space direction="vertical">
                    <Card title="Items" className={styles.itemCard}>
                        <ItemList subItems={selectedItem.subItems} updateCart={updateCart}></ItemList>
                    </Card>
                    <Card className={styles.itemCard}>
                        <Row>
                            <Col flex={5}>
                                <h2>Redeem Offer At</h2>
                                <p>{selectedItem.redeemAt}</p>
                            </Col>
                            <Col flex={5}>
                                <h2>Redeem Offer By</h2>
                                <p>{selectedItem.redeemBy}</p>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Redemption Instructions" className={styles.itemCard}>
                        <ul>
                          {selectedItem.instructions.map((instruction: string, index: number) => (
                            <li key={index}>
                                {instruction}
                            </li>
                          ))}
                        </ul>
                    </Card>
                    <Card title="What Customers Like About Us" className={styles.itemCard}>
                        <Comments />
                    </Card>
                </Space>
            </Col>
            <Col className={styles.section} flex={4}>
                <Space direction="vertical">
                    <Card title="Cart" className={styles.itemCard}>
                        <ItemCart cartItems={cartItems} addItem={addSubItem} minusItem={minusSubItem}></ItemCart>
                    </Card> 
                    <Card title="Payment" className={styles.itemCard}>
                      <PaymentCard customer={activeCustomer} item={selectedItem} cartItems={cartItems} proceedToPayment={proceedToPayment}></PaymentCard>
                    </Card>
                    <Card title="Other Similar Offers" className={styles.itemCard}>
                        coming soon
                    </Card>  
                </Space>
            </Col>
        </Row>
      </main>
    </div>
  );
}

ItemPage.Layout = Layout;

export async function getServerSideProps(context: {
  params: { item: string };
}) {

  const itemId = context.params.item;
  const item = await getItem(itemId);

  const customerId = CONSTANTS.DEFAULT_CUSTOMER_ID;
  const customer = await getCustomer(customerId);

  if (!item || !customer) {
    return {
      notFound: true,
    };
  }

  return {
    props: { item, customer },
  };
}

