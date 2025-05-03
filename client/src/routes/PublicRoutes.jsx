import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CharityListingPage from '../pages/public/CharityListingPage';
import CharityRegistration from '../components/auth/CharityRegistration';
import DonorRegistration from '../components/auth/DonorRegistration';
import LoginForm from '../components/auth/LoginForm';
import ResetPassword from '../components/auth/ResetPassword';
import RegistrationChoice from '../components/auth/RegistrationChoice';
import CharityDashboard from '../pages/charity/CharityDashboard';
// import Inventory from '../pages/inventory/Inventory';
import InventoryPage from '../pages/inventory/Inventory';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="charitydashboard" element={<CharityDashboard />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="charities" element={<CharityListingPage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegistrationChoice />} />
      <Route path="register/charity/:userType" element={<CharityRegistration />} />
      <Route path="register/donor/:userType" element={<DonorRegistration />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="inventory" element={<InventoryPage charityId={1} />} />
    </Routes>
  );
};

export default PublicRoutes;
