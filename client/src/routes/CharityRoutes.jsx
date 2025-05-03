import { Routes, Route } from 'react-router-dom';
// import CharityDashboard from '../pages/charity/CharityDashboard';
import BeneficiaryManagement from '../pages/charity/BeneficiaryManagement';
import StoryManagement from '../pages/charity/StoryManagement';
import CharityDetails from '../pages/charity/CharityDetails';
// import Inventory from '../pages/inventory/Inventory';

const CharityRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<CharityDashboard />} /> */}
      <Route path="beneficiaries" element={<BeneficiaryManagement />} />
      <Route path="stories" element={<StoryManagement />} />
      <Route path="charity-details" element={<CharityDetails />} />
      {/* <Route path="inventory" element={<Inventory charityId={1} />} /> */}
    </Routes>
  );
};

export default CharityRoutes;
