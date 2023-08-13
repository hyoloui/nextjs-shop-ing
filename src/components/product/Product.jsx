"use client";

import useFetchCollection from "@/hooks/useFetchCollection";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  return <div>Product</div>;
};

export default Product;
