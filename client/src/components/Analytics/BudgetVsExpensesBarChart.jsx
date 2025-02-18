import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";
import { getTransactionsAction } from "../../features/transactionsSlice"; // Assuming you have a slice to fetch transactions
import { getBudgetsAction } from "../../features/budgetsSlice";

const BudgetVsExpensesBarChart = () => {
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

  // Get current date
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  let lastMonth = `${now.getFullYear()}-${now
    .getMonth()
    .toString()
    .padStart(2, "0")}`;
  if (now.getMonth() == 1) {
    lastMonth = `${now.getFullYear() - 1}-12`;
  }
  const thisYear = `${now.getFullYear()}`;
  const lastYear = `${now.getFullYear() - 1}`;

  // Function to extract data for a specific period
  const extractData = (periodKey, isYear = false) => {
    const budgetLabels = [];
    const budgetData = [];
    const expenseData = [];

    Object.keys(monthlyData).forEach((monthYearKey) => {
      // Check if the key matches the period (either month or year)
      if (
        isYear ? monthYearKey.startsWith(periodKey) : monthYearKey === periodKey
      ) {
        const categories = monthlyData[monthYearKey];

        Object.keys(categories).forEach((budgetLabel) => {
          if (!budgetLabels.includes(budgetLabel)) {
            budgetLabels.push(budgetLabel);
          }
          budgetData.push(categories[budgetLabel].budget);
          expenseData.push(categories[budgetLabel].expense);
        });
      }
    });

    return {
      budgetLabels,
      series: [
        { label: "Budget", data: budgetData },
        { label: "Expense", data: expenseData },
      ],
    };
  };

  // Extract data for each chart
  const thisMonthData = useMemo(() => extractData(thisMonth), [monthlyData]);
  const lastMonthData = useMemo(() => extractData(lastMonth), [monthlyData]);
  const thisYearData = useMemo(
    () => extractData(thisYear, true),
    [monthlyData]
  );
  const lastYearData = useMemo(
    () => extractData(lastYear, true),
    [monthlyData]
  );

  return (
    <div className="flex flex-col w-full justify-start items-start space-y-4 mt-12">
      <h3 className="text-xl font-bold">Budget vs Expenses (This Month)</h3>
      <BarChart
        series={thisMonthData.series}
        height={290}
        xAxis={[{ data: thisMonthData.budgetLabels, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      <h3 className="text-xl font-bold">Budget vs Expenses (Last Month)</h3>
      <BarChart
        series={lastMonthData.series}
        height={290}
        xAxis={[{ data: lastMonthData.budgetLabels, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      <h3 className="text-xl font-bold">Budget vs Expenses (This Year)</h3>
      <BarChart
        series={thisYearData.series}
        height={290}
        xAxis={[{ data: thisYearData.budgetLabels, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      <h3 className="text-xl font-bold">Budget vs Expenses (Last Year)</h3>
      <BarChart
        series={lastYearData.series}
        height={290}
        xAxis={[{ data: lastYearData.budgetLabels, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
};

export default BudgetVsExpensesBarChart;
