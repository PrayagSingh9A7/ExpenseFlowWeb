import { FaBarsStaggered, FaChartPie, FaWallet } from 'react-icons/fa6';

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#top">
        <span className="brandIcon">
          <FaWallet />
        </span>
        <span>ExpenseFlow</span>
      </a>

      <nav className="navLinks">
        <a href="#overview">Overview</a>
        <a href="#transactions">Transactions</a>
        <a href="#insights">Insights</a>
      </nav>

      <button className="menuButton" type="button" aria-label="Open navigation">
        <FaBarsStaggered />
      </button>

      <div className="navPill">
        <FaChartPie />
        <span>Live dashboard</span>
      </div>
    </header>
  );
}

export default Navbar;
