import { FaTrashCan } from 'react-icons/fa6';
import { getCategoryMeta } from '../utils/categories.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

function ExpenseCard({ transaction, onDelete }) {
  const category = getCategoryMeta(transaction.category);
  const Icon = category.icon;

  return (
    <article className="expenseCard">
      <div className="transactionMain">
        <span className="categoryIcon" style={{ '--category-color': category.color }}>
          <Icon />
        </span>

        <div>
          <h3>{transaction.title}</h3>
          <p>
            {transaction.category} • {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="transactionMeta">
        <strong className={transaction.type}>
          {transaction.type === 'income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </strong>

        <button
          className="iconButton"
          type="button"
          onClick={() => onDelete(transaction.id)}
          aria-label={`Delete ${transaction.title}`}
        >
          <FaTrashCan />
        </button>
      </div>
    </article>
  );
}

export default ExpenseCard;
