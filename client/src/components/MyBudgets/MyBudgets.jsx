import { useDispatch, useSelector } from "react-redux";
import BudgetForm from "./BudgetForm";
import { useEffect, useState } from "react";
import { getBudgetsAction } from "../../features/budgetsSlice";
import BudgetsGrid from "./BudgetsGrid";
import { useLocation, useNavigate } from "react-router-dom";

const MyBudgets = () => {
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
    <main className="flex justify-between items-center space-x-10 min-w-screen min-h-screen px-8 relative py-[80px]">
      <BudgetsGrid />
      <BudgetForm />
    </main>
  );
};

export default MyBudgets;
