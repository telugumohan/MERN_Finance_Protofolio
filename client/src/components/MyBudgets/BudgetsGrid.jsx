import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteBudgetAction, getBudgetsAction, setSelectedBudget } from "../../features/budgetsSlice";

const BudgetsGrid = () => {
  const budgets = useSelector((state) => state.budget_slice.budgets);
  const status = useSelector((state) => state.budget_slice.status);
  const dispatch = useDispatch();

  const handleEditClick = (budget) => {
    dispatch(setSelectedBudget(budget));
  }
  const handleDelete = (id) => {
    dispatch(deleteBudgetAction(id));
  }
  useEffect(() => {
    dispatch(getBudgetsAction());
  }, [dispatch]);
  return (
    <div className="h-[600px] w-[60%]  py-4 px-5">
      {budgets ? (
        <table className="w-full">
          <thead className="border border-collapse">
            <tr className="border border-collapse">
              <th className="border border-collapse">Category</th>
              <th className="border border-collapse">Budget</th>
              <th colSpan={2} className="border border-collapse">Operations</th>
            </tr>
          </thead>
          <tbody className="border border-collapse ">
            {budgets.map((budget) => (
              <tr key={budget._id} className="border border-collapse">
                <td className="border border-collapse font-medium">{budget.budgetLabel}</td>
                <td className="border border-collapse font-medium"> {budget.budgetAmount}/-</td>
                <td className="border border-collapse">
                  <button className="bg-[#8B7F72]  font-medium px-3 cursor-pointer border" onClick={() => handleEditClick(budget)}>
                    Edit
                  </button>
                </td>
                <td className="border border-collapse py-2">
                  <button className="bg-[#8B7F72]   font-medium px-3 cursor-pointer border" onClick={() => handleDelete(budget._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-xl font-medium text-white text-center">
          No Budgets Yet!
        </p>
      )}
    </div>
  );
};

export default BudgetsGrid;
