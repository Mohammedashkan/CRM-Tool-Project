import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function SettingsPage() {
  return (
    <div className="p-6">
      <Title level={2}>Settings</Title>
      <Text type="secondary">System configuration for permissions, integrations, notifications, and email templates.</Text>
      <Card className="mt-6">This page will let admins manage global CRM settings and defaults.</Card>
    </div>
  );
}

export default SettingsPage;
