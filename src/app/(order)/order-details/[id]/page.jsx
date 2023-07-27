"use client";

import React from "react";

const OrderDetails = ({ params, searchParams }) => {
  const { id } = params;
  const { search } = searchParams;

  return (
    <div>
      {id}
      <br />
      {search}
    </div>
  );
};

export default OrderDetails;
