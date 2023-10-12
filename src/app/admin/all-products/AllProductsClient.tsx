"use client";

import styles from "./AllProducts.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "@/redux/slice/filterSlice";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { storage } from "@/firebase/firebase";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Notiflix from "notiflix";
import { toast } from "react-toastify";

import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import Search from "@/components/search/Search";
import Pagenation from "@/components/pagination/Pagination";

import useFetchCollection from "@/hooks/useFetchCollection";
import { priceFormat } from "@/utils/priceFormat";
import { deleteObject, ref } from "firebase/storage";

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

  const confirmDelete = (id: string, imageURL: string) => {
    Notiflix.Confirm.show(
      "상품 삭제",
      "이 상품을 삭제하시겠습니까?",
      "삭제",
      "취소",
      function ok() {
        deleteProduct(id, imageURL);
      },
      function cancel() {
        return;
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "#4385F4",
        okButtonBackground: "#4385F4",
        cssAnimationStyle: "zoom",
      }
    );

    const deleteProduct = async (id: string, imageURL: string) => {
      try {
        await deleteDoc(doc(db, "products", id));

        const storageRef = ref(storage, imageURL);
        await deleteObject(storageRef);

        toast.success("상품이 삭제되었습니다.");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <Heading
          title="모든 상품"
          subtitle={`${filteredProducts.length} 개의 상품`}
        />

        <div className={styles.search}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>이미지</th>
                <th>이름</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>실행</th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, category, price, imageURL } = product;
                return (
                  <tr key={id}>
                    {/* 순서 */}
                    <td>{index + 1}</td>

                    {/* 이미지 */}
                    <td>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>

                    {/* 이름 */}
                    <td>{name}</td>

                    {/* 카테고리 */}
                    <td>{category}</td>

                    {/* 가격 */}
                    <td>{priceFormat(price)}원</td>

                    {/* 실행 */}
                    <td>
                      <Link href={`/admin/edit-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>{" "}
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <Pagenation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
          productsPerPage={productsPerPage}
        />
      </div>
    </>
  );
};

export default AllProductsClient;
