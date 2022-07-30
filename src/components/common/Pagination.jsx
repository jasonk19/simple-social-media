import React from "react";
import "../../styles/components/common/Pagination.scss";

const Pagination = ({
  contentPerPage,
  totalContent,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  const totalPage = Math.ceil(totalContent / contentPerPage);

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      <ul className="page-numbers">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            style={{ background: "cyan" }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
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
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            style={{ background: "cyan" }}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
