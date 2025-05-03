import React, { useEffect, useState } from "react";
import "../../styles/CharityDashboard.css"; 

export default function CharityDashboard() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/donations");
        if (!response.ok) throw new Error("Failed to fetch donations");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const anonymousDonations = donations
    .filter((d) => d.donor_name === "Anonymous")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Tuinue Wasichana</h2>
        <nav className="sidebar-nav">
          {["Dashboard", "Donors", "Beneficiaries", "Inventory", "Stories"].map((item, i) => (
            <a key={i} href="#" className="nav-button">{item}</a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Charity Dashboard</h1>
        </header>

        <section className="summary-cards">

          <div className="card">
            <h3>Donations</h3>
            <p className="amount">KSh {(totalDonations - anonymousDonations).toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Anonymous Donations</h3>
            <p className="amount">KSh {anonymousDonations.toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Total Donations</h3>
            <p className="amount">KSh {totalDonations.toLocaleString()}</p>
          </div>
        </section>

        <section className="donors-list">
          <div className="card">
            <h2>Donors</h2>
            <ul>
              {donations.map((donation) => (
                <li key={donation.id} className="donor-item">
                  <span>{donation.donor_name}</span>
                  <span>KSh {donation.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </section> 
      </main>
    </div>
  );
}
