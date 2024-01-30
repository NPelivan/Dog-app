import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="flex items-center justify-center mt-8">
      <button
        className="font-bold py-2 px-4 rounded-l focus:outline-none"
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="Pagination--button font-bold py-2 px-4 rounded-r focus:outline-none"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;