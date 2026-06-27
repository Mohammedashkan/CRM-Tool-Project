import { Table, Tag } from 'antd';

interface TicketTableProps {
  data: any[];
  loading: boolean;
}

function TicketTable({ data, loading }: TicketTableProps) {
  const columns = [
    {
      title: 'Ticket',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Closed' ? 'green' : status === 'Open' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company'
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
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />;
}

export default TicketTable;
