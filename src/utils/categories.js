import {
  FaBus,
  FaCartShopping,
  FaFilm,
  FaHouse,
  FaMoneyBillWave,
  FaReceipt,
  FaSackDollar,
  FaUtensils
} from 'react-icons/fa6';

export const categories = [
  { name: 'Food', icon: FaUtensils, color: '#f97316' },
  { name: 'Travel', icon: FaBus, color: '#0ea5e9' },
  { name: 'Shopping', icon: FaCartShopping, color: '#ec4899' },
  { name: 'Bills', icon: FaReceipt, color: '#8b5cf6' },
  { name: 'Rent', icon: FaHouse, color: '#14b8a6' },
  { name: 'Entertainment', icon: FaFilm, color: '#f59e0b' },
  { name: 'Salary', icon: FaSackDollar, color: '#22c55e' },
  { name: 'Other', icon: FaMoneyBillWave, color: '#64748b' }
];

export function getCategoryMeta(categoryName) {
  return categories.find((category) => category.name === categoryName) || categories.at(-1);
}
