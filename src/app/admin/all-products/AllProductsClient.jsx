"use client";

// import styles from "./AllProductsClient.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "@/redux/slice/filterSlice";

import useFetchCollection from "@/hooks/useFetchCollection";
import { useEffect } from "react";

const AllProductsClient = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [search, products, dispatch]);

  return <div>AllProductsClient</div>;
};

export default AllProductsClient;
