import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function KnowledgeBasePage() {
  return (
    <div className="p-6">
      <Title level={2}>Knowledge Base</Title>
      <Text type="secondary">Create help articles, tutorials, and searchable guides for staff and clients.</Text>
      <Card className="mt-6">This page will host article categories, editor tools, and public knowledge management.</Card>
    </div>
  );
}

export default KnowledgeBasePage;
