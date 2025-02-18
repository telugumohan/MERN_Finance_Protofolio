import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsAction } from "../../features/transactionsSlice";
import RecentTransactions from "./RecentTransactions";
import ExpensesCards from "./ExpensesCards";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
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
      <ExpensesCards />
      <RecentTransactions />
    </main>
  );
};

export default Dashboard;
