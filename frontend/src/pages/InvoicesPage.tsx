import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function InvoicesPage() {
  return (
    <div className="p-6">
      <Title level={2}>Invoices</Title>
      <Text type="secondary">Generate invoices, track payments, and manage overdue balances.</Text>
      <Card className="mt-6">This page will include invoice creation, status filtering, and payment recording.</Card>
    </div>
  );
}

export default InvoicesPage;
