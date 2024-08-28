import React from 'react';
import "./styles.scss";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={i === currentPage ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      {pages}
    </div>
  );
};

