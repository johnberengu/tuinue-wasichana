import React, { useEffect, useState } from "react";
import axios from "axios";

const CharityDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donations")
      .then((response) => {
        setDonations(response.data);
        const sum = response.data.reduce((acc, item) => acc + item.amount, 0);
        setTotal(sum);
      })
      .catch((error) => console.error("Error fetching donations:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-800 text-white p-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Charity Dashboard</h1>
        <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition">Logout</button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
          {["Donations", "Donors", "Inventory", "Stories", "Beneficiaries"].map((item) => (
            <button
              key={item}
              className="w-full bg-purple-800 text-white py-2 rounded hover:bg-purple-900 transition"
            >
              {item}
            </button>
          ))}
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-8">Donations Overview</h2>

          {/* Donation Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-700">Total Donors</h3>
              <p className="text-3xl font-bold text-blue-600">{donations.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
              <p className="text-3xl font-bold text-green-600">KES {total.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-700">Beneficiaries Helped</h3>
              <p className="text-3xl font-bold text-yellow-600">150</p>
            </div>
          </div>

          {/* Donation List Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Donations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-600 mb-2">Donor Name</h4>
                {donations.map((d) => (
                  <p key={d.id} className="py-1 text-gray-700">{d.donor_name}</p>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-600 mb-2">Amount</h4>
                {donations.map((d) => (
                  <p key={d.id} className="py-1 text-gray-700">KES {d.amount.toLocaleString()}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Total Donations Section */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Donations</h3>
            <p className="text-3xl font-bold text-green-600">KES {total.toLocaleString()}</p>
          </div>
        </main>
      </div>

      {/* Footer (Optional) */}
      {/* <footer className="bg-blue-800 p-4 text-white text-center mt-6">
        <div>📧 tuinuewasichana@mail.co.ke</div>
        <div>📞 +254712345678</div>
        <div>📘 Tuinue Wasichana | 🐦 Tuinue Wasichana</div>
      </footer> */}
    </div>
  );
};

export default CharityDashboard;
