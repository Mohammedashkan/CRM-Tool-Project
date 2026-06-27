# Ashkan CRM

> A unified Customer Relationship Management tool for IT Support businesses.  
> Built by **Mohamed Ashkan**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Ant Design |
| Backend | Node.js 20, Express.js, TypeScript, Prisma ORM |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Real-time | Socket.io |
| Jobs | Bull.js |
| Containers | Docker & Docker Compose |

## Modules

1. **Authentication & Authorization** – JWT-based auth with 5 role types
2. **Client Management** – Companies & Contacts
3. **Sales Pipeline** – Deals with Kanban board
4. **Support Ticketing** – SLA-enforced ticket system
5. **Invoicing & Payments** – Invoice generation & payment tracking
6. **Contract Management** – Service agreements with SLA links
7. **IT Asset Management** – Hardware & software tracking
8. **Knowledge Base** – Internal & client-facing articles
9. **Reporting & Dashboards** – Charts & analytics
10. **Communication** – Email templates & activity logging
11. **Notifications** – Real-time alerts via Socket.io
12. **Settings & Administration** – System configuration
13. **Audit Trail** – Complete action history
14. **File Management** – Upload & attachment handling

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd "CRM Tool"

# Start all services with Docker
docker-compose up -d

# Or run individually:

# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## User Roles

| Role | Access Level |
|------|-------------|
| Admin | Full unrestricted access |
| Manager | Department-level management |
| Agent | Daily operations (tickets, contacts, deals) |
| Client | Self-service portal (own tickets, invoices) |
| Viewer | Read-only access |

## Environment Variables

Copy `.env.example` to `.env` in both `backend/` and `frontend/` directories and fill in the values.

## License

Private – All rights reserved.
