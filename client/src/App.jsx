import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import MyBudgets from "./components/MyBudgets/MyBudgets";
import Transactions from "./components/Transactions/Transactions";
import Login from "./components/User/Login";
import { useEffect, useState } from "react";
import Analytics from "./components/Analytics/Analytics";

function App() {
  
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-transactions" element={<Transactions />} />
          <Route path="/my-budgets" element={<MyBudgets />} />
          <Route path="/my-analytics" element={<Analytics />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
