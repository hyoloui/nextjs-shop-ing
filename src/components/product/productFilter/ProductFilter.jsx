import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectProducts,
  selecMinPrice,
  selectMaxPrice,
} from "@/redux/slice/productSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("10000");

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selecMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterCategories = (category) => {
    setCategory(category);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [brand, products, dispatch]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [price, products, dispatch]);

  return <div>ProductFilter</div>;
};

export default ProductFilter;
