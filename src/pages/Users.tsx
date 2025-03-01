import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../features/userSlice';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  birthDate: string;
}

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, totalUsers } = useAppSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [birthDateFilter, setBirthDateFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ limit: pageSize, page: currentPage }));
  }, [dispatch, pageSize, currentPage]);

  useEffect(() => {
    let filtered = users;
    if (nameFilter) {
      filtered = filtered.filter((user) =>
        user.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        user.lastName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (emailFilter) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }
    if (birthDateFilter) {
      filtered = filtered.filter((user) => user.birthDate === birthDateFilter);
    }
    if (genderFilter) {
      filtered = filtered.filter((user) => user.gender === genderFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        Object.values(user).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setFilteredUsers(filtered);
  }, [users, nameFilter, emailFilter, birthDateFilter, genderFilter, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string, value: string) => {
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
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchUsers({ limit: pageSize, page }));
  };

  const columns = ["firstName", "lastName", "email", "username", "gender", "birthDate"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-black mb-4">Users</h2>
      <div className="flex justify-between mb-4">
        <select
          className="border border-grey p-2 rounded-md"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} Entries
            </option>
          ))}
        </select>
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} page="users" />
      </div>
      <DataTable data={filteredUsers} columns={columns} />
      <Pagination currentPage={currentPage} totalItems={totalUsers} itemsPerPage={pageSize} onPageChange={handlePageChange} />
    </div>
  );
};

export default Users;