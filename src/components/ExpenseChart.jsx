import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { getCategoryMeta } from '../utils/categories.js';
import { formatCurrency } from '../utils/formatters.js';

function ExpenseChart({ transactions }) {
  const expenseTotals = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((totals, transaction) => {
      totals[transaction.category] = (totals[transaction.category] || 0) + transaction.amount;
      return totals;
    }, {});

  const chartData = Object.entries(expenseTotals).map(([category, amount]) => ({
    category,
    amount,
    color: getCategoryMeta(category).color
  }));

  return (
    <section className="panel chartPanel" id="insights">
      <div className="sectionHeading">
        <p>Insights</p>
        <h2>Expense breakdown</h2>
      </div>

      {chartData.length === 0 ? (
        <div className="chartFallback">
          <p>Expense insights will appear after you add expense transactions.</p>
        </div>
      ) : (
        <div className="chartGrid">
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={86}
                  paddingAngle={4}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chartBox">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `₹${value}`} tickLine={false} axisLine={false} />

                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
}

export default ExpenseChart;
