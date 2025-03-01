import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxDisplayedPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(
    totalPages,
    startPage + maxDisplayedPages - 1
  );

  if (endPage > totalPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className="px-3 py-1 bg-grey rounded-md hover:bg-black text-white"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${currentPage === page
              ? "bg-black text-white"
              : "bg-grey hover:bg-black text-black"
            }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 bg-grey rounded-md hover:bg-black text-white"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;