import { Layout } from "@components/common";
import { Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({
  categories,
}: {
  categories: {
    code: string;
    name: string;
    sequence: string;
  }[];
}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to iSnatch!</h1>

        <p className={styles.description}>Get ready to snatch cash back :-)</p>
        <ul>
          {categories.map(({ code, name }) => (
            <li key={code}>{name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(process.env.REACT_APP_API_URL + "categories/");
  const categories = await res.json();
  // console.log(categories);
  return { props: { categories } };
};

Home.Layout = Layout;
