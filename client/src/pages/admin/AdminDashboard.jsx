import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin.css';

const AdminDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/admin/pending");
        if (!response.ok) {
          throw new Error("Failed to fetch pending applications");
        }

        const data = await response.json();
        setPendingCount(data.length);
      } catch (error) {
        console.error("Error fetching pending count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCount();
  }, []);

  return (
    <section className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/charity-approval">Charity Approvals</Link></li>
          <li><Link to="/admin/delete-charities">Delete Charities</Link></li>
        </ul>
      </nav>
      <div className="dashboard-widgets">
        <div className="widget">
          <h2>Pending Approvals</h2>
          <p>Number of charities awaiting approval: 
          <strong>{pendingCount}</strong>
        </p>
        </div>
        <div className="widget">
          <h2>System Status</h2>
          <p>All systems operational</p>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
