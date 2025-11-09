import React, { useState } from 'react';
import Navmenu from '../components/Navmenu';
import Navbar from '../components/Navbar';
import DashboardArticle from '../components/DashboardArticle';
import Chart from '../components/ui/chart-area-interactive';
import Transaction from '../components/Transcation';
import CreditCard from '../components/CreditCard';
import TransferLog from '../components/TransferLog';
import '../components/Styles/Dashboard.scss';
import ErrorBoundary from '@/ErrorHandling/ErrorBoundary';

const Dashboard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="dashboard-layout">
      <button
        className="hamburger-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
      </button>

      <aside className={`dashboard-sidebar ${menuOpen ? 'active' : ''}`}>
        <Navmenu closeMenu={() => setMenuOpen(false)} />
      </aside>
      {/* Dashboard */}
      <main className="dashboard-main">
        {/* Navbar */}
        <Navbar />
        {/* Dashboard Content*/}
        <div className="dashboard-content">
          <div className="dashboard-top">
            <div className="dashboard-left">
              {/* Dashboard Article Side */}
              <DashboardArticle />
              {/* Chart Of Timeline */}
              <Chart />
              {/* Error handling */}
              <ErrorBoundary>
                {/* Transaction */}
              <Transaction />
              </ErrorBoundary>
              {/* Left Side Nav Menu*/}
            </div>
            <div className="dashboard-right">
              <CreditCard />
              <TransferLog />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;



/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/