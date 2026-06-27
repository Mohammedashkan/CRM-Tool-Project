import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function AssetsPage() {
  return (
    <div className="p-6">
      <Title level={2}>Assets</Title>
      <Text type="secondary">Manage hardware, software, and license assets assigned to clients.</Text>
      <Card className="mt-6">This page will display asset status, warranty dates, and assignment history.</Card>
    </div>
  );
}

export default AssetsPage;
