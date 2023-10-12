"use client";

import styles from "./ChangeOrderStatus.module.scss";

import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Loader from "@/components/loader/Loader";
import Button from "@/components/button/Button";

import type { IOrder } from "@/types";

interface IChangeOrderStatusProps {
  order: IOrder;
  id: string;
}
const ChangeOrderStatus = ({ order, id }: IChangeOrderStatusProps) => {
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    // const orderData = {
    //   userID: order.userID, // same data
    //   userEmail: order.userEmail, // same data
    //   orderDate: order.orderDate, // same data
    //   orderAmount: order.orderAmount, // same data
    //   cartItems: order.cartItems, // same data
    //   shippingAddress: order.shippingAddress, // same data
    //   createdAt: order.createdAt, // same data
    //   orderStatus: status,
    //   editedAt: Timestamp.now().toDate(),
    // };
    const orderData = {
      ...order,
      orderStatus: status,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderData);
      setIsLoading(false);
      toast.success("주문 상태가 변경되었습니다.");
      router.push("/admin/orders");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader basic />}
      <div className={styles.status}>
        <div className={styles.card}>
          <h4>주문 상태 업데이트</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option disabled value="">
                -- 선택 --
              </option>
              <option value="주문수락">주문수락</option>
              <option value="주문처리중">주문처리중</option>
              <option value="배송중">배송중</option>
              <option value="배송완료">배송완료</option>
            </select>

            <div>
              <Button type="submit">업데이트</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
