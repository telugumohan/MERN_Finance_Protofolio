import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import MonthlyExpensesBarChart from "./MonthlyExpensesBarChart";
import BudgetVsExpensesBarChart from "./BudgetVsExpensesBarChart";
import CategoryWisePie from "./CategoryWisePie";

const Analytics = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
  }, [profile, navigate, location]);
  return (
    <main className="flex flex-col justify-start items-center space-y-10 min-w-screen min-h-screen px-8 relative py-[80px]">
        <MonthlyExpensesBarChart />
        <BudgetVsExpensesBarChart />
        <CategoryWisePie />
    </main>
  );
};

export default Analytics;
