import { Button, Card, Typography } from 'antd';
import { useContacts } from '../hooks/useContacts';
import ContactTable from '../components/common/ContactTable';

const { Title, Text } = Typography;

function ContactsPage() {
  const { data, isLoading, isError } = useContacts();
  const contacts = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title level={2}>Contacts</Title>
          <Text type="secondary">Manage client contacts, search by company, and view relationship details.</Text>
        </div>
        <Button type="primary">New Contact</Button>
      </div>

      <Card className="mt-6">
        {isError ? (
          <Text type="danger">Unable to load contacts. Please refresh the page.</Text>
        ) : (
          <ContactTable data={contacts} loading={isLoading} />
        )}
      </Card>
    </div>
  );
}

export default ContactsPage;
