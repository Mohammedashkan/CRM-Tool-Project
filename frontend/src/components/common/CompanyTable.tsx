import { Table, Tag } from 'antd';

interface CompanyTableProps {
  data: any[];
  loading: boolean;
}

function CompanyTable({ data, loading }: CompanyTableProps) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry'
    },
    {
      title: 'Site',
      dataIndex: 'website',
      key: 'website',
      render: (website: string) => website || '—'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, record: any) => [record.city, record.state, record.country].filter(Boolean).join(', ')
    },
    {
      title: 'Status',
      dataIndex: 'deletedAt',
      key: 'status',
      render: (deletedAt: string | null) => (
        <Tag color={deletedAt ? 'red' : 'green'}>{deletedAt ? 'Deleted' : 'Active'}</Tag>
      )
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />;
}

export default CompanyTable;
