import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";
import { getTransactionsAction } from "../../features/transactionsSlice"; // Assuming you have a slice to fetch transactions

const MonthlyExpensesBarChart = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions_slice.transactions);

  useEffect(() => {
    dispatch(getTransactionsAction()); // Fetch the transactions when the component mounts
  }, [dispatch]);

  // Function to calculate monthly expenses
  const getMonthlyExpenses = () => {
    const monthlyData = {};

    transactions?.forEach((transaction) => {
      const amount = Number(transaction.amount);
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // Get month index (0 = January, 11 = December)
      const year = transactionDate.getFullYear();

      // Create a unique key for each month-year combination
      const monthYearKey = `${year}-${month + 1}`; // Format: "YYYY-MM"

      // Add the transaction amount to the corresponding month-year bucket
      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = 0;
      }
      monthlyData[monthYearKey] += amount;
    });

    return monthlyData;
  };

  // Transform the monthly expenses into an array format suitable for the BarChart
  const formatMonthlyData = () => {
    const monthlyData = getMonthlyExpenses();
    const formattedData = [];

    for (let key in monthlyData) {
      formattedData.push({
        monthYear: key, // YYYY-MM
        expense: monthlyData[key],
      });
    }

    // Sort the data by month (ascending)
    return formattedData.sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));
  };

  // Prepare the data for the BarChart
  const chartData = formatMonthlyData();
  const monthYearArray = chartData.map((item) => item.monthYear); // Array of months (YYYY-MM format)
  const expenseArray = chartData.map((item) => item.expense); // Array of expenses

  return (
    <div className="flex flex-col w-full justify-start items-start space-y-4 mt-12">
      <h3 className="text-xl font-bold">Monthly Expenses</h3>
      <BarChart
        series={[
          {
            data: expenseArray, // Array of expenses
          },
        ]}
        xAxis={[
          {
            data: monthYearArray, // Array of months
            scaleType: "band", // Band scale type for categorical data
          },
        ]}
        height={300}
        margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
        barLabel="value"
        
      />
    </div>
  );
};

export default MonthlyExpensesBarChart;
