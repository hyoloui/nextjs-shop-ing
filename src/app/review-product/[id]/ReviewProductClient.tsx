"use client";

import styles from "./ReviewProduct.module.scss";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "@/redux/slice/authSlice";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useFetchDocument from "@/hooks/useFetchDocument";

import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import Button from "@/components/button/Button";

const ReviewProductClient = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");

  const router = useRouter();
  const { id } = useParams();

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  const { document: product } = useFetchDocument("products", id as string);

  const submitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewData = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewData);

      router.push(`/product-details/${id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className={styles.review}>
      <Heading title="상품평 작성하기" />
      {product === null ? (
        <Loader basic />
      ) : (
        <div>
          <p>
            <b>상품 이름:</b>
            {product.name}
          </p>
          <Image
            src={product.imageURL}
            alt={product.name}
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <div className={styles.card}>
        <form onSubmit={(e) => submitReview(e)}>
          <label>평점:</label>
          <Rating initialValue={rate} onClick={(rate) => setRate(rate)} />
          <label>상품평:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            cols={30}
            rows={10}
          ></textarea>
          <Button type="submit">상품평 작성하기</Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewProductClient;
