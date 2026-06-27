import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function ProfilePage() {
  return (
    <div className="p-6">
      <Title level={2}>Profile</Title>
      <Text type="secondary">View and update your profile, password, and notification preferences.</Text>
      <Card className="mt-6">This page will let users update personal information and security settings.</Card>
    </div>
  );
}

export default ProfilePage;
