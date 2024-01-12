import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductCover = ({ products, totalProducts }) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products?.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      // Show all page buttons if the total pages are less than or equal to the maximum visible buttons
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show ellipses and a subset of page buttons for larger total pages
      const leftEllipsis = currentPage - Math.floor(maxVisibleButtons / 2);
      const rightEllipsis = currentPage + Math.floor(maxVisibleButtons / 2);

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= leftEllipsis && i <= rightEllipsis)) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </button>
          );
        } else if (i === leftEllipsis - 1 || i === rightEllipsis + 1) {
          // Add ellipses when skipping pages
          pageButtons.push(<span key={`ellipsis-${i}`}>...</span>);
        }
      }
    }

    return pageButtons;
  };

  return (
    <>
      <div className={`product-cover ${totalProducts && totalProducts.length <= 10 ? 'mb-12' : ''}`}>
        {currentProducts?.length > 0 ? (
          currentProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No Results</p>
        )}
      </div>
        {totalPages > 1 && (
          <div className='pagination mt-4'>
            <button className='prev' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              &#8592; Previous
            </button>
            <div className='mx-auto'>
               {renderPageButtons()}
            </div>

            <button className='prev' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              Next &#8594;
            </button>
          </div>
        )}
    </>
    
  );
};

export default ProductCover;
