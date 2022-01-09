import { Button, Col, Divider, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { CartItem, Item, SubItem } from "types/item";
import { Payment } from "types/payment";

export default function PaymentCard(props: any) {
  const balance = +props.customer.balance;
  const customerId = props.customer._id;
  const itemId = props.item._id;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cashbackUsed, setCashbackUsed] = useState<number>(0);
  const [cashbackSnatched, setCashbackSnatched] = useState<number>(0);
  const [amountPayable, setAmountPayable] = useState<number>(0);

  useEffect(() => {
    let sum: number = 0;
    const itemCashback: number = +props.item.cashback;
    const cartItems: CartItem[] = props.cartItems;
    cartItems.forEach(item => {
      sum += +item.total;
    });
    const used = Math.min(sum, balance);
    const payable = sum - used;
    const snatched = payable * itemCashback / 100;
    setTotalPrice(sum);
    setCashbackUsed(used);
    setAmountPayable(payable);
    setCashbackSnatched(snatched);
  });

  const proceedToPayment = () => {
    const payment: Payment = {
      customer: customerId,
      item: itemId,
      totalPrice: totalPrice,
      cashbackUsed: cashbackUsed,
      amountPaid: amountPayable,
      cashbackSnatched: cashbackSnatched
    }
    props.proceedToPayment(payment);
  };

  return (
    <div>
      <Row>
        <Col span={16}>Total Price</Col>
        <Col span={8}>${totalPrice}</Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={16}>Cashback Used</Col>
        <Col span={8}>${cashbackUsed}</Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={16}>Amount Payable</Col>
        <Col span={8}>${amountPayable}</Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={16}>Cashback Snatched</Col>
        <Col span={8}>${cashbackSnatched}</Col>
      </Row>
      <Divider></Divider>
      <Button type="primary" onClick={e => proceedToPayment()}>Proceed to Payment</Button>
    </div>
  );
}
