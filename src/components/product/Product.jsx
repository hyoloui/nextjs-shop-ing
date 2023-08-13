"use client";

import styles from "./Product.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "@/redux/slice/productSlice";

import useFetchCollection from "@/hooks/useFetchCollection";

import Loader from "@/components/loader/Loader";
import ProductList from "@/components/product/productList/ProductList";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}></aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList products={products} />}
      </div>
    </section>
  );
};

export default Product;
