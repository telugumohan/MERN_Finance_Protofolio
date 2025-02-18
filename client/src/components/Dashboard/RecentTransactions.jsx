import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTransactionsAction } from "../../features/transactionsSlice";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const transactions = useSelector(
    (state) => state.transactions_slice.transactions
  );
  const dispatch = useDispatch();
  let sortedTransactions = [];
  if (transactions) {
    sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  useEffect(() => {
    dispatch(getTransactionsAction());
  }, [dispatch]);
  return (
    <div className="h-[600px] w-full  py px-5">
      <div className="flex justify-between items-center py-2">
        <p className="text-xl font-bold">Recent Transactions</p>
        <button className="bg-[#8B7F72]   font-medium px-3 cursor-pointer border">
          <Link to={"/my-transactions"}> Show More</Link>
        </button>
      </div>
      {transactions && transactions.length > 0 ? (
        <table className="w-full">
          <thead className="border border-collapse">
            <tr className="border border-collapse">
              <th className="border border-collapse">Date</th>
              <th className="border border-collapse">Amount</th>
              <th className="border border-collapse">Category</th>
              <th className="border border-collapse">Description</th>
            </tr>
          </thead>
          <tbody className="border border-collapse ">
            {sortedTransactions.slice(0, 5).map((transaction) => (
              <tr key={transaction._id} className="border border-collapse">
                <td className="border border-collapse font-medium">
                  {transaction.date}
                </td>
                <td className="border border-collapse font-medium">
                  {" "}
                  {transaction.amount}/-
                </td>
                <td className="border border-collapse font-medium">
                  {transaction.budgetLabel}
                </td>
                <td className="border border-collapse font-medium">
                  {transaction.description ? transaction.description : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : ("No Transactions Yet!")}
    </div>
  );
};

export default RecentTransactions;
