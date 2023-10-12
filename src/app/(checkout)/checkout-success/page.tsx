import styles from "./CheckoutSuccess.module.scss";

import Link from "next/link";

import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";

import { priceFormat } from "@/utils/priceFormat";
import { formatTime } from "@/utils/day";

interface ICheckoutSuccessProps {
  searchParams: {
    orderId: string;
  };
}

interface IPayment {
  orderName: string;
  orderId: string;
  approveAt: string;
  totalAmount: number;
  card: {
    number: string;
    amount: number;
  };
}

const CheckoutSuccess = async ({ searchParams }: ICheckoutSuccessProps) => {
  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const payment: IPayment = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      ContentType: "application/json",
    },
  }).then((res) => res.json());

  const { card } = payment;

  return (
    <section className={styles.success}>
      <Heading title="결제 성공" />
      <ul className={styles.list}>
        <li>
          <b>결제 상품: {payment.orderName}</b>
        </li>
        <li>
          <b>주문 번호: {payment.orderId}</b>
        </li>
        <li>
          <b>
            카드 번호: {card ? card.number : "카드 번호가 확인되지 않습니다"}
          </b>
        </li>
        <li>
          <b>결제 금액: {priceFormat(payment.totalAmount)}원</b>
        </li>
        <li>
          <b>결제 승인날짜: {formatTime(payment.approveAt)}</b>
        </li>
      </ul>

      <Button>
        <Link href="/order-history">주문 상태 보기</Link>
      </Button>
    </section>
  );
};

export default CheckoutSuccess;
