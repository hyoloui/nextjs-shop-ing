"use client";

import styles from "./productDetailsClient.module.scss";

import { useParams } from "next/navigation";
import useFetchDocument from "@/hooks/useFetchDocument";

import Loader from "@/components/loader/loader";

const ProductDetailsClient = () => {
  const params = useParams();

  const { document: product } = useFetchDocument("productDetail", id);

  const addToCart = () => {};
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  return (
    <section className={styles.product}>
      {product === null ? <Loader /> : <></>}
    </section>
  );
};

export default ProductDetailsClient;
