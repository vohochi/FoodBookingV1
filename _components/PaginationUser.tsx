// Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean; // Để kiểm tra có trang tiếp theo không
}

const PaginationUser: React.FC<PaginationProps> = ({ currentPage, onPrevious, onNext, hasNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={onNext} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};

export default PaginationUser;
