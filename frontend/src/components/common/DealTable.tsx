import { Table, Tag } from 'antd';

interface DealTableProps {
  data: any[];
  loading: boolean;
}

function DealTable({ data, loading }: DealTableProps) {
  const columns = [
    {
      title: 'Deal',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => amount != null ? `$${amount.toLocaleString()}` : '—'
    },
    {
      title: 'Stage',
      dataIndex: ['stage', 'name'],
      key: 'stage'
    },
    {
      title: 'Contact',
      dataIndex: ['contact', 'name'],
      key: 'contact'
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
        <Tag color={deletedAt ? 'red' : 'green'}>{deletedAt ? 'Closed' : 'Open'}</Tag>
      )
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />;
}

export default DealTable;
