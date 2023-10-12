"use client";

import styles from "./Product.module.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_PRICE_RANGE, STORE_PRODUCTS } from "@/redux/slice/productSlice";

import useFetchCollection from "@/hooks/useFetchCollection";

import Loader from "@/components/loader/Loader";
import ProductFilter from "@/components/product/productFilter/ProductFilter";
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

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {" "}
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
