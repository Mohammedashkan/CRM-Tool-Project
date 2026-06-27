import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import CompaniesPage from './pages/CompaniesPage';
import DealsPage from './pages/DealsPage';
import TicketsPage from './pages/TicketsPage';
import InvoicesPage from './pages/InvoicesPage';
import ContractsPage from './pages/ContractsPage';
import AssetsPage from './pages/AssetsPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="deals" element={<DealsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="contracts" element={<ContractsPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
