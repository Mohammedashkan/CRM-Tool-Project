import { Table, Tag } from 'antd';

interface ContactTableProps {
  data: any[];
  loading: boolean;
}

function ContactTable({ data, loading }: ContactTableProps) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company'
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'name'],
      key: 'owner'
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

export default ContactTable;
