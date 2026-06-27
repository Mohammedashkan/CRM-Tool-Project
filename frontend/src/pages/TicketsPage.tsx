import { Button, Card, Typography } from 'antd';
import { useTickets } from '../hooks/useTickets';
import TicketTable from '../components/common/TicketTable';

const { Title, Text } = Typography;

function TicketsPage() {
  const { data, isLoading, isError } = useTickets();
  const tickets = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title level={2}>Tickets</Title>
          <Text type="secondary">Manage support requests, SLA deadlines, and ticket conversations.</Text>
        </div>
        <Button type="primary">New Ticket</Button>
      </div>

      <Card className="mt-6">
        {isError ? (
          <Text type="danger">Unable to load tickets. Please refresh the page.</Text>
        ) : (
          <TicketTable data={tickets} loading={isLoading} />
        )}
      </Card>
    </div>
  );
}

export default TicketsPage;
