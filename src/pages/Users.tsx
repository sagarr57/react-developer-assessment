import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../features/userSlice";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(pageSize));
  }, [dispatch, pageSize]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (query: string) => {
    if (query) {
      setFilteredUsers(users.filter((user) => Object.values(user).some((val) => val.toString().includes(query))));
    } else {
      setFilteredUsers(users);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchUsers(pageSize));
  };

  const columns = ["firstName", "lastName", "age", "gender", "email", "username", "bloodGroup", "eyeColor"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-black mb-4">Users</h2>
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
        <SearchBar onSearch={handleSearch} />
      </div>
      {status === "loading" ? <p>Loading...</p> : <DataTable data={filteredUsers} columns={columns} />}
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
    </div>
  );
};

export default Users;
