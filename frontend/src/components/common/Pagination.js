import React from "react";
import Pagination from "react-js-pagination";

export default function CustomPagination({ page, pageSize, total, onChange }) {
  return (
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      innerClass="pagination float-right"
      prevPageText="‹"
      nextPageText="›"
      activePage={page}
      itemsCountPerPage={pageSize}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      onChange={onChange}
    />
  );
}
