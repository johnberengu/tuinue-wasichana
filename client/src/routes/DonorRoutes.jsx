import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DonorDashboard from '../pages/donor/DonorDashboard';
import DonationPage from '../pages/donor/DonationPage';
import SettingsPage from '../pages/donor/SettingsPage';

const DonorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DonorDashboard />} />
      <Route path="donate" element={<DonationPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default DonorRoutes;
