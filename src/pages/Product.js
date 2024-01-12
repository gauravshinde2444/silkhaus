import React, { useEffect, useState } from 'react';
import ProductCover from "../Product/ProductCover";
import Button from 'react-bootstrap/Button';

const Product = (props) => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState('lowToHigh');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function fetchProductDetails() {
    try {
      setIsLoading(true);
      const data = await fetch('https://api.escuelajs.co/api/v1/products');
      const res = await data.json();
      setProducts(res);
      setSearchResults(sortInitialProducts(res));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const data = await fetch('https://api.escuelajs.co/api/v1/categories');
      const res = await data.json();
      setCategories(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, []);

  useEffect(() => {
    sortProducts();
  }, [sortOption]);

  const sortProducts = () => {
    if (searchResults) {
      const sortedProducts = [...searchResults];

      if (sortOption === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'highToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setSearchResults(sortedProducts);
    }
  };

  const sortInitialProducts = (productsToSort) =>{
    const sortedProducts = [...productsToSort];
    if(sortedProducts.length){
      if (sortOption === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'highToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }  
    }
    return sortedProducts;
  }

  const filterProductsByCategoryAndSearch = () => {
    let filteredProducts = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.id === parseInt(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setSearchResults(sortInitialProducts(filteredProducts));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter suggestions based on the search query
    const filteredSuggestions = query.trim() === ''
      ? []  // Return an empty array if the query is empty
      : products.filter((product) =>
          product.title.toLowerCase().includes(query)
        );

    setSuggestions(filteredSuggestions);
  };

  const handleSearchButtonClick = () => {
    filterProductsByCategoryAndSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  return (
    <div>
      <div className='search-box'>
        <div className='w-50'>
          <label className='d-block'>Product Category</label>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="all">All</option>
            {categories?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className='align-self-center w-50'>
          <label className='d-block'>Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Type to search..."
          />
          <Button variant="primary" onClick={handleSearchButtonClick}>
            Search Products
          </Button>

          {suggestions.length > 0 ? <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.title}
              </li>
            ))}
          </ul> : ''}
        </div>
      </div>

      <div className="d-flex">
        <h1 className="search-header">Product search</h1>
        <select className="sort-select" onChange={handleSortChange} value={sortOption}>
          <option value="lowToHigh">Sort By Price: Low to High</option>
          <option value="highToLow">Sort By Price: High to Low</option>
        </select>
      </div>

      {isLoading ? (
        <h3 className="text-center">Loading...</h3>
      ) : (
        <ProductCover products={searchResults} totalProducts={products}/>
      )}
    </div>
  );
};

export default Product;
