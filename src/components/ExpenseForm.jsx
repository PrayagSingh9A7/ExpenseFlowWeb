import { useState } from 'react';
import { FaCircleCheck, FaCircleExclamation, FaPlus } from 'react-icons/fa6';
import { categories } from '../utils/categories.js';

const initialForm = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10)
};

function ExpenseForm({ onAddTransaction }) {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.amount || Number(form.amount) <= 0 || !form.date) {
      setMessage({ type: 'error', text: 'Please fill all fields with a valid amount.' });
      return;
    }

    onAddTransaction({
      ...form,
      id: crypto.randomUUID(),
      title: form.title.trim(),
      amount: Number(form.amount)
    });

    setForm({ ...initialForm, date: new Date().toISOString().slice(0, 10) });
    setMessage({ type: 'success', text: 'Transaction added successfully.' });
  }

  return (
    <section className="panel formPanel">
      <div className="sectionHeading">
        <p>Quick entry</p>
        <h2>Add transaction</h2>
      </div>

      <form className="expenseForm" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            type="text"
            placeholder="Groceries, salary, rent..."
            value={form.title}
            onChange={updateField}
          />
        </label>

        <label>
          Amount
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={updateField}
          />
        </label>

        <div className="formRow">
          <label>
            Type
            <select name="type" value={form.type} onChange={updateField}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={updateField}>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={updateField} />
        </label>

        {message && (
          <div className={`message ${message.type}`}>
            {message.type === 'success' ? <FaCircleCheck /> : <FaCircleExclamation />}
            <span>{message.text}</span>
          </div>
        )}

        <button className="primaryButton" type="submit">
          <FaPlus />
          <span>Add transaction</span>
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;
