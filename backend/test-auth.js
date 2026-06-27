const http = require('http');
const data = JSON.stringify({ email: 'admin@ashkancrm.com', password: 'ChangeMe123!' });

const loginOptions = {
  hostname: '127.0.0.1',
  port: 4000,
  path: '/api/v1/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(loginOptions, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('LOGIN_RESPONSE');
    console.log(body);
    try {
      const parsed = JSON.parse(body);
      const token = parsed?.data?.accessToken;
      if (!token) {
        console.error('No access token in login response.');
        process.exit(1);
      }
      const contactsOptions = {
        hostname: '127.0.0.1',
        port: 4000,
        path: '/api/v1/contacts',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const contactsReq = http.request(contactsOptions, (contactsRes) => {
        let contactsBody = '';
        contactsRes.on('data', (chunk) => (contactsBody += chunk));
        contactsRes.on('end', () => {
          console.log('CONTACTS_RESPONSE');
          console.log(contactsBody);
          process.exit(0);
        });
      });
      contactsReq.on('error', (err) => {
        console.error('CONTACTS_ERROR', err);
        process.exit(1);
      });
      contactsReq.end();
    } catch (err) {
      console.error('LOGIN_PARSE_ERROR', err);
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('LOGIN_ERROR', err);
  process.exit(1);
});
req.write(data);
req.end();
