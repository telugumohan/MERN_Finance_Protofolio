import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTransactionAction, getTransactionsAction, setSelectedTransactionAction } from "../../features/transactionsSlice";

const TransactionsGrid = () => {
  const transactions = useSelector(
    (state) => state.transactions_slice.transactions
  );
  const status = useSelector((state) => state.budget_slice.status);
  const dispatch = useDispatch();

  const handleEditClick = (transaction) => {
    dispatch(setSelectedTransactionAction(transaction));
  }

  const handleDelete = (id) => {
    dispatch(deleteTransactionAction(id));
  }
  useEffect(() => {
    dispatch(getTransactionsAction());
  }, [dispatch]);
  return (
    <div className="w-[60%]  py-4 px-5 h-full">
      {transactions && transactions.length > 0 ? (
        <table className="w-full">
          <thead className="border border-collapse">
            <tr className="border border-collapse">
              <th className="border border-collapse">Date</th>
              <th className="border border-collapse">Amount</th>
              <th className="border border-collapse">Category</th>
              <th className="border border-collapse">Info</th>
              <th colSpan={2} className="border border-collapse">
                Operations
              </th>
            </tr>
          </thead>
          <tbody className="border border-collapse ">
            {transactions.map((transaction) => (
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
                  {transaction.description}
                </td>
                <td className="border border-collapse">
                  <button className="bg-[#8B7F72]  font-medium px-3 cursor-pointer border" onClick={() => handleEditClick(transaction)}>
                    Edit
                  </button>
                </td>
                <td className="border border-collapse py-2">
                  <button className="bg-[#8B7F72]   font-medium px-3 cursor-pointer border" onClick={() => handleDelete(transaction._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-xl font-medium text-white text-center">
          No Transactions Yet!
        </p>
      )}
    </div>
  );
};

export default TransactionsGrid;
