import { useRouter } from 'next/router'
import { Layout } from "@components/common";
import styles from "../../styles/Home.module.css";

const Category = () => {
  const router = useRouter()
  const { category } = router.query

  return (
    <div className={styles.container}>
        <main className={styles.main}>
            <h3 className={styles.title}>{category}</h3>
        </main>
    </div>
  )
}

Category.Layout = Layout;
export default Category
