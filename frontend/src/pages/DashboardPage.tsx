import { Card, Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;

function DashboardPage() {
  return (
    <div className="p-6">
      <Title level={2}>Dashboard</Title>
      <Text type="secondary">Welcome to Ashkan CRM. Your operational hub starts here.</Text>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24} md={12} xl={8}>
          <Card title="Open Tickets">2</Card>
        </Col>
        <Col span={24} md={12} xl={8}>
          <Card title="Pipeline Value">$48,200</Card>
        </Col>
        <Col span={24} md={12} xl={8}>
          <Card title="Overdue Invoices">3</Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
