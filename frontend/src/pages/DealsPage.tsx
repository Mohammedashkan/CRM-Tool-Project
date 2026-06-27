import { Button, Card, Typography } from 'antd';
import { useDeals } from '../hooks/useDeals';
import DealTable from '../components/common/DealTable';

const { Title, Text } = Typography;

function DealsPage() {
  const { data, isLoading, isError } = useDeals();
  const deals = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title level={2}>Deals</Title>
          <Text type="secondary">Track opportunities, pipeline stages, and revenue forecasts.</Text>
        </div>
        <Button type="primary">New Deal</Button>
      </div>

      <Card className="mt-6">
        {isError ? (
          <Text type="danger">Unable to load deals. Please refresh the page.</Text>
        ) : (
          <DealTable data={deals} loading={isLoading} />
        )}
      </Card>
    </div>
  );
}

export default DealsPage;
