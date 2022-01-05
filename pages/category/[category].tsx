import { Layout } from "@components/common";
import styles from "../../styles/Home.module.css";
import { getCategory } from "services/rewards";
import { Category } from "types/category";
import { InferGetStaticPropsType } from "next";
import { Card, Col, Row } from "antd";
import Link from "next/link";
import { Item } from "types/item";

export default function CategoryPage({
  category,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const cat: Category = category;
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.description}>{cat.name} offers to get cashback</p>
        <Row gutter={16}>
          {cat.items.map((item: Item) => (
            <Link 
              key={item._id}
              href={{
                pathname: '/item/[item]',
                query: { item: item._id },
              }}
            >
              <Col span={8}>
                <Card className={styles.card} title={item.name}>
                  {item.cashback}% cashback
                </Card>
              </Col>
            </Link>
          ))}
        </Row>
      </main>
    </div>
  );
}

CategoryPage.Layout = Layout;

export async function getServerSideProps(context: {
  params: { category: string };
}) {
  const categoryId = context.params.category;
  const category = await getCategory(categoryId);
  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category },
  };
}
