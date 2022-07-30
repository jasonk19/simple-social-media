import React from "react";
import "../../styles/components/common/Pagination.scss";

const Pagination = ({
  contentPerPage,
  totalContent,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContent / contentPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      <ul className="page-numbers">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              style={{ background: currentPage === number ? "cyan" : "" }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
