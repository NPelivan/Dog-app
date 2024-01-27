import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;