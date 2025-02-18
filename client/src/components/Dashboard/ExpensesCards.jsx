import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsAction } from "../../features/transactionsSlice";
import ExpenseCard from "./ExpenseCard";

const ExpensesCards = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  let lastMonth = month - 1;
  let lastMonthYear = year;

  if (month === 1) {
    lastMonth = 12;
    lastMonthYear = year - 1;
  }

  let todayAmount = 0;
  let thisMonthAmount = 0;
  let lastMonthAmount = 0;
  const categoryMap = new Map();
  const transactions = useSelector(
    (state) => state.transactions_slice.transactions
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsAction());
  }, [dispatch]);

  if (transactions) {
    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount);
      if (categoryMap.has(transaction.budgetLabel)) {
        categoryMap.set(
          transaction.budgetLabel,
          categoryMap.get(transaction.budgetLabel) + amount
        );
      } else {
        categoryMap.set(transaction.budgetLabel, amount);
      }

      if (transaction.date === today) {
        todayAmount += Number(transaction.amount);
      }

      // Check if transaction is in the same month and year
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth() + 1;
      const transactionYear = transactionDate.getFullYear();
      if (transactionMonth === parseInt(month) && transactionYear === year) {
        thisMonthAmount += transaction.amount;
      }
      // Check if transaction is in the last month and year
      if (transactionMonth === lastMonth && transactionYear === lastMonthYear) {
        lastMonthAmount += amount;
      }
    });
  }

  return (
    <div className="flex flex-col w-full justify-start items-start space-y-4">
      <p className="text-xl font-bold">Expenses</p>
      <div className="flex justify-start items-center space-x-4">
        <ExpenseCard amount={todayAmount} label={"Today"} />
        <ExpenseCard amount={thisMonthAmount} label={"This Month"} />
        <ExpenseCard amount={lastMonthAmount} label={"Last Month"} />
      </div>
      <p className="text-xl font-bold">Category wise expense</p>
      {categoryMap.size > 0 ? (
        <ul className="flex justify-start items-center space-x-4">
        {Array.from(categoryMap.entries()).map(([key, value]) => (
          <li key={key}>
            <ExpenseCard amount={value} label={key} />
          </li>
        ))}
      </ul>
      ): ("No Transactions Yet!")}
    </div>
  );
};

export default ExpensesCards;
