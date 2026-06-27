import { Button, Card, Typography } from 'antd';
import { useCompanies } from '../hooks/useCompanies';
import CompanyTable from '../components/common/CompanyTable';

const { Title, Text } = Typography;

function CompaniesPage() {
  const { data, isLoading, isError } = useCompanies();
  const companies = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title level={2}>Companies</Title>
          <Text type="secondary">View and manage client organisations, addresses, and billing details.</Text>
        </div>
        <Button type="primary">New Company</Button>
      </div>

      <Card className="mt-6">
        {isError ? (
          <Text type="danger">Unable to load companies. Please refresh the page.</Text>
        ) : (
          <CompanyTable data={companies} loading={isLoading} />
        )}
      </Card>
    </div>
  );
}

export default CompaniesPage;
