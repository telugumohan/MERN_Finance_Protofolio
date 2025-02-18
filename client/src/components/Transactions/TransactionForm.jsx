import { useEffect, useState } from "react";
import InputFeild from "../InputFeilds/InputFeild";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createTransactionAction,
  setSelectedTransactionAction,
  updateTransactionAction,
} from "../../features/transactionsSlice";
import { getBudgetsAction } from "../../features/budgetsSlice";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTransaction = useSelector(
    (state) => state.transactions_slice.selectedTransaction
  );
  const categories = useSelector((state) => state.budget_slice.budgets);
  useEffect(() => {
    dispatch(getBudgetsAction());
  }, [dispatch]);

  const [transaction, setTransaction] = useState({
    budgetLabel: "",
    amount: 0,
    budgetId: "",
    date: "",
    description: "",
  });
  //const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategorySelect = (event) => {
    const selectedCategory = JSON.parse(event.target.value);
    const budgetLabel = selectedCategory.label;
    const categoryId = selectedCategory.id;

    setTransaction({
      ...transaction,
      budgetLabel: budgetLabel,
      budgetId: categoryId,
    }); // Update budgetLabel
  };

  useEffect(() => {
    if (selectedTransaction) {
      setTransaction({
        budgetLabel: selectedTransaction.budgetLabel,
        amount: selectedTransaction.amount,
        budgetId: selectedTransaction.budgetId,
        date: selectedTransaction.date,
        description: selectedTransaction.description,
      });
    }
  }, [selectedTransaction]);

  const handleValueChange = (e) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [e.target.name]: e.target.value,
    }));
  };

  const clear = () => {
    setTransaction({
      budgetLabel: "",
      amount: 0,
      budgetId: "",
      date: "",
      description: "",
    });
    dispatch(setSelectedTransactionAction(null));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (transaction.amount === "" || transaction.amount === 0) {
      console.log("Enter valid budget!!");
      return;
    }
    if (transaction.budgetLabel === "" || transaction.budgetId === "") {
      console.log("Select Category Error!");
      return;
    }
    if (selectedTransaction) {
      // Updating old Budget
      dispatch(
        updateTransactionAction({
          id: selectedTransaction._id,
          newTransaction: transaction,
        })
      );
    } else {
      // Creating new Budget
      dispatch(createTransactionAction(transaction));
    }
    clear();
  };

  return (
    <div className="flex flex-col w-[40%] justify-center items-center h-[600px] space-y-3 text-white bg-[#8B7F72] bg-opacity-50">
      <p className="text-4xl font-bold mb-3">
        {selectedTransaction ? "Update Transaction" : "Create Transaction"}
      </p>
      <form
        className="flex flex-col justify-start space-y-4 px-4 py-6 mx-10 w-[80%] min-h-[360px]"
        onSubmit={handleFormSubmit}
      >
        <select
          value={JSON.stringify({
            label: transaction.budgetLabel,
            id: transaction.budgetId
          })}
          onChange={handleCategorySelect}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="" id="" className="bg-[#BBAA99] text-white">
            Select a category
          </option>
          {categories.map((category) => (
            <option
              key={category._id}
              value={JSON.stringify({ label: category.budgetLabel, id: category._id })}
              className="bg-[#BBAA99] text-white"
            >
              {category.budgetLabel}
            </option>
          ))}
        </select>

        <InputFeild
          name={"amount"}
          type={"number"}
          placeHolderText={"Budget Amount"}
          value={transaction.amount}
          onValueChange={handleValueChange}
          readOnly={false}
          required={true}
        />

        <InputFeild
          name={"date"}
          type={"date"}
          placeHolderText={"Date"}
          value={transaction.date}
          onValueChange={handleValueChange}
          readOnly={false}
          required={true}
        />

        <InputFeild
          name={"description"}
          type={"text"}
          placeHolderText={"Description (Optional)"}
          value={transaction.description}
          onValueChange={handleValueChange}
          readOnly={false}
          required={false}
        />

        <button
          type="submit"
          className="flex justify-center items-center px-4 py-2 bg-[#BBAA99] text-white text-lg font-medium cursor-pointer"
        >
          {selectedTransaction ? "Update Transaction" : "Create Transaction"}
        </button>
        <button
          className="flex justify-center items-center px-4 py-2 bg-[#BBAA99] text-white text-lg font-medium cursor-pointer" onClick={clear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
