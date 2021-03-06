import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "services/rewards";
import { Button, Menu } from 'antd';
import { Category } from "types/category";

const initialValue: Category[] = [];

export default function Navbar() {
  const [categories, setCategories] = useState(initialValue);
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <div>
      <div>
        <nav>
          <Menu mode="horizontal">
            <Menu.Item key='home'>
              <Link href="/">
                <a>Home</a>
              </Link>
            </Menu.Item>
            {categories.map((item, index) => (
              <Menu.Item key={item.code}>
                <Link
                  key={item._id} 
                  href={{
                    pathname: '/category/[category]',
                    query: { category: item._id },
                  }}
                >
                  <a>{item.name}</a>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </nav>
      </div>
    </div>
  );
}
