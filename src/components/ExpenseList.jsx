import { FaInbox } from 'react-icons/fa6';
import ExpenseCard from './ExpenseCard.jsx';

function ExpenseList({ transactions, onDelete, hasTransactions }) {
  if (!hasTransactions) {
    return (
      <section className="panel emptyState" id="transactions">
        <FaInbox />
        <h2>No transactions yet</h2>
        <p>Add your first income or expense to start tracking your cash flow.</p>
      </section>
    );
  }

  if (transactions.length === 0) {
    return (
      <section className="panel emptyState" id="transactions">
        <FaInbox />
        <h2>No matches found</h2>
        <p>Try changing your search, category, or type filter.</p>
      </section>
    );
  }

  return (
    <section className="panel transactionPanel" id="transactions">
      <div className="sectionHeading">
        <p>Ledger</p>
        <h2>Recent transactions</h2>
      </div>

      <div className="expenseList">
        {transactions.map((transaction) => (
          <ExpenseCard
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default ExpenseList;
