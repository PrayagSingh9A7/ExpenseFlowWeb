import { FaArrowTrendDown, FaArrowTrendUp, FaScaleBalanced } from 'react-icons/fa6';
import { formatCurrency } from '../utils/formatters.js';

const cards = [
  { key: 'balance', label: 'Total Balance', icon: FaScaleBalanced, tone: 'balance' },
  { key: 'income', label: 'Total Income', icon: FaArrowTrendUp, tone: 'income' },
  { key: 'expense', label: 'Total Expenses', icon: FaArrowTrendDown, tone: 'expense' }
];

function SummaryCards({ summary }) {
  return (
    <section className="summaryGrid" id="overview">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article className={`summaryCard ${card.tone}`} key={card.key}>
            <div>
              <p>{card.label}</p>
              <strong>{formatCurrency(summary[card.key])}</strong>
            </div>
            <span className="summaryIcon">
              <Icon />
            </span>
          </article>
        );
      })}
    </section>
  );
}

export default SummaryCards;
