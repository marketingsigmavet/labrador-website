import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="llk-pagination" aria-label="Article pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </nav>
  );
}

