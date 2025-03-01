
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../features/productSlice";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, totalProducts } = useAppSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ limit: pageSize, page: currentPage, filter: "" }));
  }, [dispatch, pageSize, currentPage]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (query: string) => {
    if (query) {
      setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  };

  const handleFilterChange = (filter: string, value: string) => {
    let parsedValue: string | number = value;

    if (filter === "price" || filter === "rating") {
      parsedValue = parseFloat(value);
    }

    switch (filter) {
      case "title":
        setFilteredProducts(
          value
            ? products.filter((product) =>
              product.title && product.title.toLowerCase().includes(value.toLowerCase())
            )
            : products
        );
        break;
      case "brand":
        setFilteredProducts(
          value
            ? products.filter((product) =>
              product.brand && product.brand.toLowerCase().includes(value.toLowerCase())
            )
            : products
        );
        break;
      case "category":
        setFilteredProducts(
          value
            ? products.filter((product) =>
              product.category && product.category.toLowerCase().includes(value.toLowerCase())
            )
            : products
        );
        break;
      case "price":
        setFilteredProducts(
          value
            ? products.filter((product) => product.price === parsedValue)
            : products
        );
        break;
      case "rating":
        setFilteredProducts(
          value
            ? products.filter((product) => product.rating === parsedValue)
            : products
        );
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchProducts({ limit: pageSize, page, filter: "" }));
  };

  const columns = ["title", "brand", "category", "price", "rating"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-black mb-4">Products</h2>
      <div className="flex justify-between mb-4">
        <select
          className="border border-grey p-2 rounded-md"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} Entries
            </option>
          ))}
        </select>
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} page="products" />
      </div>
      <DataTable data={filteredProducts} columns={columns} />
      <Pagination currentPage={currentPage} totalItems={totalProducts} itemsPerPage={pageSize} onPageChange={handlePageChange} />
    </div>
  );
};

export default Products;