import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionsGrid from "./TransactionsGrid";
import { useLocation, useNavigate } from "react-router-dom";



const Transactions = () => {
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
    <main className="flex justify-between items-start space-x-10 min-w-screen min-h-screen px-8 relative py-[80px]">
      <TransactionsGrid />
      <TransactionForm />
    </main>
  );
};

export default Transactions;
