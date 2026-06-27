import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function ReportsPage() {
  return (
    <div className="p-6">
      <Title level={2}>Reports</Title>
      <Text type="secondary">View dashboard analytics for tickets, revenue, SLA compliance, and team performance.</Text>
      <Card className="mt-6">This page will show charts, custom reports, and export options.</Card>
    </div>
  );
}

export default ReportsPage;
