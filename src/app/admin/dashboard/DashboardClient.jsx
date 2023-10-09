"use client";

// import syltes from "./Dashboard.module.scss";

import useFetchCollection from "@/hooks/useFetchCollection";

import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { STORE_PRODUCTS } from "@/redux/slice/productSlice";
import {
  STORE_ORDERS,
  CALCULATE_TOTAL_ORDER_AMOUNT,
} from "@/redux/slice/orderSlice";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="#4e85f4" />;

const DashboardClient = () => {
  const dispatch = useDispatch();

  const products = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: products.data,
      })
    );
    dispatch(STORE_ORDERS(data));
    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, products]);

  return <div>DashboardClient</div>;
};

export default DashboardClient;
