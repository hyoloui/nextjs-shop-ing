import styles from "./Pagination.module.scss";

import { useState } from "react";

interface IPaginationProps {
  currentPage: number;
  productsPerPage: number;
  setCurrentPage: (page: number) => void;
  totalProducts: number;
}
const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts,
}: IPaginationProps) => {
  const pageNumbers = [];

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginateNextPage = () => {
    setCurrentPage(currentPage + 1);

    // 최대 페이지 넘버를 넘어가면 최소, 최대 페이지 넘버를 증가시킨다.
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrevPage = () => {
    setCurrentPage(currentPage - 1);

    // 최소 페이지 넘버보다 작아지면 최소, 최대 페이지 넘버를 감소시킨다.
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // 총 product 수 / 페이지당 product 수 = 총 페이지 수
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.pagination}>
      <li
        className={currentPage === pageNumbers[0] ? styles.hidden : ""}
        onClick={paginatePrevPage}
      >
        {"<"}
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              className={currentPage === number ? styles.active : ""}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : ""
        }
        onClick={paginateNextPage}
      >
        {">"}
      </li>
    </div>
  );
};

export default Pagination;
