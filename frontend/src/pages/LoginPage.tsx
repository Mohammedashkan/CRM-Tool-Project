import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import { login } from '../api/auth';
import { saveAuthTokens } from '../utils/storage';

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const authData = await login(values.email, values.password);
      saveAuthTokens(authData);
      message.success('Logged in successfully');
      navigate('/');
    } catch (error: any) {
      message.error(error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <Title level={3}>Ashkan CRM</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}> 
            <Input placeholder="name@company.com" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}> 
            <Input.Password placeholder="********" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
