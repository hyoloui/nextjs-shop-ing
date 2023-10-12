"use client";

import styles from "./OrderHistory.module.scss";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFetchCollection from "@/hooks/useFetchCollection";
import { STORE_ORDERS, selectOrderHistory } from "@/redux/slice/orderSlice";
import { selectUserID } from "@/redux/slice/authSlice";

import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";

import { formatTime } from "@/utils/day";
import { priceFormat } from "@/utils/priceFormat";

const OrderHistoryClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading } = useFetchCollection("orders");

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserID);

  const filteredOrders = orders.filter((order) => order.userID === userId);

  const handleClick = (id: string) => {
    router.push(`/order-details/${id}`);
  };

  return (
    <section className={styles.order}>
      <Heading title="주문 목록" />
      {isLoading && <Loader />}
      <div className={styles.table}>
        {filteredOrders.length === 0 ? (
          <p>주문 목록이 없습니다.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>주문 날짜</th>
                <th>주문 아이디</th>
                <th>주문 금액</th>
                <th>주문 상태</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => {
                const { id, orderDate, orderTime, orderAmount, orderStatus } =
                  order;
                return (
                  <tr key={id} onClick={() => handleClick(id)}>
                    <td>{index + 1}</td>
                    <td>{formatTime(orderDate)}</td>
                    <td>{id}</td>
                    <td>{priceFormat(orderAmount)}</td>
                    <td>
                      <p
                        className={
                          orderStatus !== "배송완료"
                            ? `${styles.pending}`
                            : `${styles.deliverd}`
                        }
                      >
                        {orderStatus}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default OrderHistoryClient;
