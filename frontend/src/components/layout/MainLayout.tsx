import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  ApartmentOutlined,
  RiseOutlined,
  SolutionOutlined,
  FileTextOutlined,
  ProfileOutlined,
  DiffOutlined,
  DatabaseOutlined,
  ReadOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="72">
        <div className="h-16 flex items-center justify-center text-white text-xl font-semibold">ASHKAN</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[window.location.pathname === '/' ? '/' : window.location.pathname]}
          onClick={({ key }) => (key === '/logout' ? navigate('/login') : navigate(key))}
          items={[
            { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
            { key: '/contacts', icon: <TeamOutlined />, label: 'Contacts' },
            { key: '/companies', icon: <ApartmentOutlined />, label: 'Companies' },
            { key: '/deals', icon: <RiseOutlined />, label: 'Deals' },
            { key: '/tickets', icon: <SolutionOutlined />, label: 'Tickets' },
            { key: '/invoices', icon: <FileTextOutlined />, label: 'Invoices' },
            { key: '/contracts', icon: <ProfileOutlined />, label: 'Contracts' },
            { key: '/assets', icon: <DatabaseOutlined />, label: 'Assets' },
            { key: '/knowledge-base', icon: <ReadOutlined />, label: 'Knowledge Base' },
            { key: '/reports', icon: <BarChartOutlined />, label: 'Reports' },
            { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
            { key: '/profile', icon: <ProfileOutlined />, label: 'Profile' },
            { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' }
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-6 shadow-sm flex items-center justify-between">
          <div className="font-semibold">Ashkan CRM</div>
        </Header>
        <Content className="bg-slate-50 p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
