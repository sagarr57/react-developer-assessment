import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-6">
        <nav className="mb-6">
          <NavLink to="/users" className="mr-4 text-black font-bold">
            Users
          </NavLink>
          <NavLink to="/products" className="text-black font-bold">
            Products
          </NavLink>
        </nav>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
