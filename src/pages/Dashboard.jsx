import { useMemo, useState } from 'react';
import ExpenseChart from '../components/ExpenseChart.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import Navbar from '../components/Navbar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { formatCurrency } from '../utils/formatters.js';

const initialFilters = {
  query: '',
  type: 'all',
  category: 'all'
};

function Dashboard() {
  const [transactions, setTransactions] = useLocalStorage('expenseflow-transactions', []);
  const [filters, setFilters] = useState(initialFilters);

  const summary = useMemo(() => {
    return transactions.reduce(
      (totals, transaction) => {
        if (transaction.type === 'income') {
          totals.income += transaction.amount;
        } else {
          totals.expense += transaction.amount;
        }

        totals.balance = totals.income - totals.expense;
        return totals;
      },
      { balance: 0, income: 0, expense: 0 }
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((transaction) => {
        const matchesQuery =
          !query ||
          transaction.title.toLowerCase().includes(query) ||
          transaction.category.toLowerCase().includes(query);

        const matchesType = filters.type === 'all' || transaction.type === filters.type;
        const matchesCategory =
          filters.category === 'all' || transaction.category === filters.category;

        return matchesQuery && matchesType && matchesCategory;
      });
  }, [transactions, filters]);

  function addTransaction(transaction) {
    setTransactions([transaction, ...transactions]);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  }

  return (
    <div className="appShell" id="top">
      <Navbar />

      <main>
       <section className="hero">
  <div className="heroContent">
    <p className="eyebrow">Personal finance dashboard</p>
    <h1>Manage your money with clarity.</h1>
    <p>
      Track income, expenses, categories, and spending trends in one simple
      rupee-friendly dashboard.
    </p>
  </div>

  <div className="heroStat">
    <span>Current balance</span>
    <strong>{formatCurrency(summary.balance)}</strong>
  </div>
</section>



        <SummaryCards summary={summary} />

        <section className="workspaceGrid">
          <ExpenseForm onAddTransaction={addTransaction} />

          <div className="transactionsArea">
            <SearchBar filters={filters} onFilterChange={setFilters} />
            <ExpenseList
              transactions={filteredTransactions}
              onDelete={deleteTransaction}
              hasTransactions={transactions.length > 0}
            />
          </div>
        </section>

        <ExpenseChart transactions={transactions} />
      </main>
    </div>
  );
}

export default Dashboard;
