"use client";

import styles from "./OrderHistory.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFetchCollection from "@/hooks/useFetchCollection";
import { STORE_ORDERS, selectOrdersHistory } from "@/redux/slice/orderSlice";
import { selectUserID } from "@/redux/slice/authSlice";

const OrderHistoryClient = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("orders");

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  const selectOrder = useSelector(selectOrdersHistory);
  const userId = useSelector(selectUserID);

  return <div>OrderHistoryClient</div>;
};

export default OrderHistoryClient;
