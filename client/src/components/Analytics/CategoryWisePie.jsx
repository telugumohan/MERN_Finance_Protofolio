import React, { useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTransactionsAction } from "../../features/transactionsSlice"; // Assuming you have a slice to fetch transactions
import { getBudgetsAction } from "../../features/budgetsSlice";

const CategoryWisePie = () => {

    const dispatch = useDispatch();
    const transactions = useSelector(
      (state) => state.transactions_slice.transactions
    );
    const budgets = useSelector((state) => state.budget_slice.budgets); // Get budgets from state
  
    useEffect(() => {
      dispatch(getTransactionsAction()); // Fetch transactions
      dispatch(getBudgetsAction()); // Fetch budgets
    }, [dispatch]);
  
    // Update getMonthlyBudgetVsExpenses function
    const getMonthlyBudgetVsExpenses = () => {
      const monthlyData = {};
  
      // Step 1: Iterate through transactions and build monthlyData
      transactions?.forEach((transaction) => {
        const amount = Number(transaction.amount);
        const transactionDate = new Date(transaction.date);
        const month = transactionDate.getMonth() + 1;
        const year = transactionDate.getFullYear();
        const monthYearKey = `${year}-${month.toString().padStart(2, "0")}`;
        const budgetId = transaction.budgetLabel;
  
        // Initialize monthYear object if not present
        if (!monthlyData[monthYearKey]) {
          monthlyData[monthYearKey] = {};
        }
  
        // Initialize budgetId object if not present
        if (!monthlyData[monthYearKey][budgetId]) {
          monthlyData[monthYearKey][budgetId] = {
            expense: 0,
            budget: 0,
          };
        }
  
        // Accumulate expense
        monthlyData[monthYearKey][budgetId].expense += amount;
      });
  
      // Step 2: Iterate over budgets and update budget values in monthlyData
      budgets?.forEach((budget) => {
        const budgetId = budget.budgetLabel;
        const budgetAmount = Number(budget.budgetAmount);
  
        // Loop through all monthYears in monthlyData
        Object.keys(monthlyData).forEach((monthYearKey) => {
          // If budgetId exists, update budget value
          if (monthlyData[monthYearKey][budgetId]) {
            monthlyData[monthYearKey][budgetId].budget = budgetAmount;
          } else {
            // If budgetId doesn't exist, initialize with expense = 0
            monthlyData[monthYearKey][budgetId] = {
              expense: 0,
              budget: budgetAmount,
            };
          }
        });
      });
      return monthlyData;
    };
  
  const monthlyData = getMonthlyBudgetVsExpenses();

  // Aggregate expenses category-wise
  const categoryData = useMemo(() => {
    const categoryTotals = {};

    Object.keys(monthlyData).forEach((monthYearKey) => {
      const categories = monthlyData[monthYearKey];

      Object.keys(categories).forEach((budgetLabel) => {
        const expense = categories[budgetLabel].expense;

        // Accumulate expenses by budgetLabel
        if (categoryTotals[budgetLabel]) {
          categoryTotals[budgetLabel] += expense;
        } else {
          categoryTotals[budgetLabel] = expense;
        }
      });
    });

    // Convert to array format for PieChart
    return Object.keys(categoryTotals).map((label, index) => ({
      id: index,
      value: categoryTotals[label],
      label,
    }));
  }, [monthlyData]);

  return (
    <div className="flex flex-col w-full justify-start items-start space-y-4 mt-12">
      <h3 className="text-xl font-bold">Category-wise Expenses</h3>
      <PieChart
        series={[
          {
            data: categoryData,
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
};

export default CategoryWisePie;
