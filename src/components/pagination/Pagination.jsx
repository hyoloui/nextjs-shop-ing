import React, { useState } from "react";

const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  for (let i = 0; i < Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push[i];
  }
  return <div>Pagination</div>;
};

export default Pagination;
