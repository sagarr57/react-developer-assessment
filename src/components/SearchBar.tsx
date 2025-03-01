import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string, value: string) => void;
  page: "users" | "products";
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange,
  page,
}) => {
  const [query, setQuery] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [birthDateFilter, setBirthDateFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    setNameFilter("");
    setEmailFilter("");
    setBirthDateFilter("");
    setGenderFilter("");
    setBrandFilter("");
    setCategoryFilter("");
    setPriceFilter("");
    setRatingFilter("");
  }, [page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (filter: string, value: string) => {
    if (page === "users") {
      if (filter !== "name") setNameFilter("");
      if (filter !== "email") setEmailFilter("");
      if (filter !== "birthDate") setBirthDateFilter("");
      if (filter !== "gender") setGenderFilter("");
    } else if (page === "products") {
      if (filter !== "brand") setBrandFilter("");
      if (filter !== "category") setCategoryFilter("");
      if (filter !== "price") setPriceFilter("");
      if (filter !== "rating") setRatingFilter("");
    }

    switch (filter) {
      case "name":
        setNameFilter(value);
        break;
      case "email":
        setEmailFilter(value);
        break;
      case "birthDate":
        setBirthDateFilter(value);
        break;
      case "gender":
        setGenderFilter(value);
        break;
      case "brand":
        setBrandFilter(value);
        break;
      case "category":
        setCategoryFilter(value);
        break;
      case "price":
        setPriceFilter(value);
        break;
      case "rating":
        setRatingFilter(value);
        break;
      default:
        break;
    }
    onFilterChange(filter, value);
  };

  return (
    <div className="flex items-center space-x-4">
      {page === "users" && (
        <>
          {/* Name Filter */}
          <div>
            <input
              type="text"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Name"
              value={nameFilter}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>

          {/* Email Filter */}
          <div>
            <input
              type="text"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Email"
              value={emailFilter}
              onChange={(e) => handleFilterChange("email", e.target.value)}
            />
          </div>

          {/* Birth Date Filter */}
          <div>
            <input
              type="date"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Birth Date"
              value={birthDateFilter}
              onChange={(e) => handleFilterChange("birthDate", e.target.value)}
            />
          </div>

          {/* Gender Filter */}
          <div>
            <select
              className="border border-grey p-2 rounded-md"
              value={genderFilter}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </>
      )}
      {page === "products" && (
        <>
          {/* Brand Filter */}
          <div>
            <input
              type="text"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Brand"
              value={brandFilter}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <input
              type="text"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Category"
              value={categoryFilter}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div>
            <input
              type="number"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Price"
              value={priceFilter}
              onChange={(e) => handleFilterChange("price", e.target.value)}
            />
          </div>

          {/* Rating Filter */}
          <div>
            <input
              type="number"
              className="border border-grey p-2 rounded-md"
              placeholder="Filter by Rating"
              value={ratingFilter}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            />
          </div>
        </>
      )}

      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border border-grey p-2 rounded-md"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;