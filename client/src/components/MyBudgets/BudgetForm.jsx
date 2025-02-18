import { useEffect, useState } from "react";
import InputFeild from "../InputFeilds/InputFeild";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBudgetAction,
  setSelectedBudget,
  updateBudgetAction,
} from "../../features/budgetsSlice";
import { categories } from "../../constants";

const BudgetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedBudget = useSelector(
    (state) => state.budget_slice.selectedBudget
  );
  const [budget, setBudget] = useState({ budgetLabel: "", budgetAmount: 0 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategorySelect = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    setBudget({ ...budget, budgetLabel: selected }); // Update budgetLabel
  };
  useEffect(() => {
    if (selectedBudget) {
      setBudget({
        budgetLabel: selectedBudget.budgetLabel,
        budgetAmount: selectedBudget.budgetAmount,
      });
    }
  }, [selectedBudget]);
  const handleValueChange = (e) => {
    setBudget((prevBudget) => ({
      ...prevBudget,
      [e.target.name]: e.target.value,
    }));
  };

  const clear = () => {
    setSelectedCategory("");
    setBudget({ budgetLabel: "", budgetAmount: 0 });
    dispatch(setSelectedBudget(null));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (budget.budgetAmount === "" || budget.budgetAmount === 0) {
      console.log("Enter valid budget!!");
      return;
    }
    setBudget({ ...budget, budgetLabel: budget.budgetLabel.toLowerCase() });
    if (selectedBudget) {
      // Updating old Budget
      dispatch(
        updateBudgetAction({ id: selectedBudget._id, newBudget: budget })
      );
    } else {
      // Creating new Budget
      dispatch(createBudgetAction(budget));
    }
    clear();
  };

  return (
    <div className="flex flex-col w-[40%] justify-center items-center h-[600px] space-y-3 text-white bg-[#8B7F72] bg-opacity-50">
      <p className="text-4xl font-bold mb-3">
        {selectedBudget ? "Update Budget" : "Create Budget"}
      </p>
      <form
        className="flex flex-col justify-start space-y-4 px-4 py-6 mx-10 w-[80%] min-h-[360px]"
        onSubmit={handleFormSubmit}
      >
        <select
          value={selectedCategory}
          onChange={handleCategorySelect}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="" className="bg-[#BBAA99] text-white">
            Select a category
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className="bg-[#BBAA99] text-white"
            >
              {category}
            </option>
          ))}
        </select>
        <p className="text-center">OR</p>
        <InputFeild
          name={"budgetLabel"}
          type={"text"}
          placeHolderText={"Category"}
          value={budget.budgetLabel}
          onValueChange={handleValueChange}
          readOnly={selectedCategory !== ""}
        />

        <InputFeild
          name={"budgetAmount"}
          type={"number"}
          placeHolderText={"Budget Amount"}
          value={budget.budgetAmount}
          onValueChange={handleValueChange}
          readOnly={false}
        />

        <button
          type="submit"
          className="flex justify-center items-center px-4 py-2 bg-[#BBAA99] text-white text-lg font-medium cursor-pointer"
        >
          {selectedBudget ? "Update Budget" : "Create Budget"}
        </button>
        <button className="flex justify-center items-center px-4 py-2 bg-[#BBAA99] text-white text-lg font-medium cursor-pointer" onClick={clear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
