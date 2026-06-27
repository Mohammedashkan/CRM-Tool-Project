import { Button, Card, Typography } from 'antd';
import { useContracts } from '../hooks/useContracts';
import ContractTable from '../components/common/ContractTable';

const { Title, Text } = Typography;

function ContractsPage() {
  const { data, isLoading, isError } = useContracts();
  const contracts = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title level={2}>Contracts</Title>
          <Text type="secondary">Track service agreements, renewal dates, and linked SLA policies.</Text>
        </div>
        <Button type="primary">New Contract</Button>
      </div>

      <Card className="mt-6">
        {isError ? (
          <Text type="danger">Unable to load contracts. Please refresh the page.</Text>
        ) : (
          <ContractTable data={contracts} loading={isLoading} />
        )}
      </Card>
    </div>
  );
}

export default ContractsPage;
