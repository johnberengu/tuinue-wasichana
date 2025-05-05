import { Routes, Route } from 'react-router-dom';
import CharityDashboard from '../pages/charity/CharityDashboard';
// import Beneficiary from '../pages/beneficiary/Beneficiary';
import StoryManagement from '../pages/charity/StoryManagement';
import CharityDetails from '../pages/charity/CharityDetails';
// import InventoryPage from '../pages/inventory/Inventory';

const CharityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CharityDashboard />} />
      {/* <Route path="beneficiaries" element={<Beneficiary />} /> */}
      {/* <Route path="inventory" element={<InventoryPage />} /> */}
      <Route path="stories" element={<StoryManagement />} /> 
      <Route path="charity-details" element={<CharityDetails />} />
      {/* <Route path="inventory" element={<Inventory charityId={id} />} /> */}
    </Routes>
  );
};

export default CharityRoutes;
