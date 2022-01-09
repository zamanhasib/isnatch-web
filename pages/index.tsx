import { Layout } from "@components/common";
import type { InferGetStaticPropsType, NextPage } from "next";
import { getCategories } from "services/rewards";
import { Category } from "types/category";
import styles from "../styles/Home.module.css";
import { Card, Col, Row } from 'antd';
import Link from "next/link";

export default function Home({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to iSnatch!</h1>

        <p className={styles.description}>Get ready to snatch cash back</p>

        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          {categories.map((category: Category) => (
            <Link 
              key={category._id}
              href={{
                pathname: '/category/[category]',
                query: { category: category._id },
              }}
            >
              <Col className="gutter-row" span={8}>
                <Card hoverable={true} title={category.name}>
                  {category.items.length} offers available
                </Card>
              </Col>
            </Link>
          ))}
        </Row>

      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const categories = await getCategories();
  return { props: { categories } };
};

Home.Layout = Layout;
