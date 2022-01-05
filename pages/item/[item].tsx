import { Layout } from "@components/common";
import styles from "../../styles/Home.module.css";
import { InferGetStaticPropsType } from "next";
import { Item } from "types/item";
import { getItem } from "services/rewards";
import { Card, Col, Divider, Row, Space } from "antd";
import classNames from "classnames";
import { ItemList, Comments } from "@components/item";
export default function ItemPage({
  item,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const selectedItem: Item = item;
  return (
    <div className={styles.container}>
      <main>
        <p className={styles.description}>{selectedItem.name} offering {selectedItem.cashback}% cashback</p>
        <Row>
            <Col className={styles.section} flex={7}>
                <Space direction="vertical">
                    <Card title="Items" className={styles.itemCard}>
                        <ItemList subItems={selectedItem.subItems}></ItemList>
                    </Card>
                    <Card className={styles.itemCard}>
                        <Row>
                            <Col flex={5}>
                                <h2>Redeem Offer At</h2>
                                <p>77, Robinson road</p>
                            </Col>
                            <Col flex={5}>
                                <h2>Redeem Offer By</h2>
                                <p>Fri 4, Feb 2022</p>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Redemption Instructions" className={styles.itemCard}>
                        <ul>
                            <li>
                                Reservation not required.
                            </li>
                            <li>
                                Present your SMS sent by iSnatch at the outlet.
                            </li>
                        </ul>
                    </Card>
                    <Card title="What Customers Like About Us" className={styles.itemCard}>
                        <Comments />
                    </Card>
                </Space>
            </Col>
            <Col className={styles.section} flex={3}>
                <Space direction="vertical">
                    <Card title="Cart" className={styles.itemCard}>
                        <p>Card content</p>
                        <p>Card content</p>
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
  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: { item },
  };
}
