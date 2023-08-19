import styles from "./ProductList.module.scss";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "@/redux/slice/filterSlice";

import ProductItem from "@/components/product/productItem/ProductItem";
import Pagenation from "@/components/pagination/Pagination";

const ProductList = () => {
  const [sort, setSort] = useState("latest"); // 최신순, 인기순, 낮은가격순, 높은가격순

  const filteredProducts = useSelector(selectFilteredProducts); // 필터링된 상품들

  const dispatch = useDispatch();

  // 상품 정렬
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sort]);

  const [currentPage, setCurrentPage] = useState(1); // 페이지 번호
  const [productsPerPage, setProductsPerPage] = useState(10); // 한 페이지에 보여줄 상품 수

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const isRadioSelected = (value) => sort === value;
  const handleRadioClick = (e) => setSort(e.target.value);

  return (
    <div className={styles.productList}>
      <div className={styles.top}>
        <div>
          <ul className={styles.sort}>
            <li className={isRadioSelected("latest") ? styles.selected : ""}>
              <input
                type="radio"
                value="latest"
                id="latest"
                checked={isRadioSelected("latest")}
                onChange={handleRadioClick}
              />
              <label htmlFor="latest">최신순</label>
            </li>
            <li
              className={isRadioSelected("lowest-price") ? styles.selected : ""}
            >
              <input
                type="radio"
                value="lowest-price"
                id="lowest-price"
                checked={isRadioSelected("lowest-price")}
                onChange={handleRadioClick}
              />
              <label htmlFor="lowest-price">낮은 가격순</label>
            </li>
            <li
              className={
                isRadioSelected("highest-price") ? styles.selected : ""
              }
            >
              <input
                type="radio"
                value="highest-price"
                id="highest-price"
                checked={isRadioSelected("highest-price")}
                onChange={handleRadioClick}
              />
              <label htmlFor="highest-price">높은 가격순</label>
            </li>
          </ul>
        </div>

        <div className={styles.limit}>
          <select
            value={productsPerPage}
            onChange={(e) => setProductsPerPage(+e.target.value)}
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} />
                </div>
              );
            })}
          </>
        )}
      </div>

      <Pagenation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};

export default ProductList;
