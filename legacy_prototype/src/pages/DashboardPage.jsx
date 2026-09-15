import React from 'react';
import { Card } from '../components/Card';
import { Users, CheckCircle, Clock, Upload } from 'lucide-react';
import { Button } from '../components/Button';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page container animate-fade-in py-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-primary">Officer Dashboard</h1>
        <Button variant="primary" size="sm">
          <Upload size={16} /> Bulk Upload
        </Button>
      </header>

      <section className="stats-grid mb-6">
        <Card className="stat-card">
          <div className="stat-icon bg-primary-light">
            <Users size={24} color="white" />
          </div>
          <div className="stat-info">
            <div className="stat-value">1,245</div>
            <div className="stat-label">Total Citizens Reached</div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon bg-success">
            <CheckCircle size={24} color="white" />
          </div>
          <div className="stat-info">
            <div className="stat-value">850</div>
            <div className="stat-label">Schemes Approved</div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon bg-warning">
            <Clock size={24} color="white" />
          </div>
          <div className="stat-info">
            <div className="stat-value">124</div>
            <div className="stat-label">Pending Verifications</div>
          </div>
        </Card>
      </section>

      <section className="village-overview">
        <h2 className="text-xl text-primary mb-4">Village Overview (Rampur)</h2>
        <Card className="overflow-x-auto p-0">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Citizen Name</th>
                <th>Aadhaar Last 4</th>
                <th>Matched Scheme</th>
                <th>Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ramesh Kumar</td>
                <td>**** 1234</td>
                <td>PM-KISAN</td>
                <td><span className="text-success font-bold">95%</span></td>
                <td><span className="status-badge pending">Pending</span></td>
              </tr>
              <tr>
                <td>Sunita Devi</td>
                <td>**** 5678</td>
                <td>PM-JAY</td>
                <td><span className="text-success font-bold">90%</span></td>
                <td><span className="status-badge approved">Approved</span></td>
              </tr>
              <tr>
                <td>Amit Patel</td>
                <td>**** 9012</td>
                <td>Kisan Credit Card</td>
                <td><span className="text-warning font-bold">60%</span></td>
                <td><span className="status-badge info">More Info</span></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
