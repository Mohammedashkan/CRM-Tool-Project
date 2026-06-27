import { Table, Tag } from 'antd';

interface ContractTableProps {
  data: any[];
  loading: boolean;
}

function ContractTable({ data, loading }: ContractTableProps) {
  const columns = [
    { title: 'Reference', dataIndex: 'reference', key: 'reference' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Company', dataIndex: ['company', 'name'], key: 'company' },
    { title: 'SLA', dataIndex: ['slaPolicy', 'name'], key: 'sla' },
    { title: 'Start', dataIndex: 'startDate', key: 'start' },
    { title: 'End', dataIndex: 'endDate', key: 'end' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={status === 'ACTIVE' ? 'green' : 'orange'}>{status}</Tag>
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />;
}

export default ContractTable;
