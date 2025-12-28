# Admin System Setup Guide

## Database Tables

Run the following SQL commands to create the required tables:

```sql
-- Create admin_otps table for OTP storage
CREATE TABLE admin_otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  otp VARCHAR(6) NOT NULL,
  otp_expiry DATETIME NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admins table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'blocked') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create seller_otps table for seller OTP storage
CREATE TABLE seller_otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  otp VARCHAR(6) NOT NULL,
  otp_expiry DATETIME NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add status column to sellers table if it doesn't exist
ALTER TABLE sellers ADD COLUMN status ENUM('pending', 'approved', 'rejected', 'blocked') DEFAULT 'pending';
```

## Environment Variables

Add the following to your backend `.env` file:

```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name

# JWT
JWT_SECRET=your_jwt_secret_key

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_from_gmail

# Admin
SUPER_ADMIN_EMAIL=admin@yourdomain.com
ADMIN_DASHBOARD_URL=http://localhost:3000

# Server
PORT=4000
```

## Gmail App Password Setup

1. Go to [Google Account](https://myaccount.google.com/)
2. Click "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. Search for "App passwords"
5. Select "Mail" and "Windows Computer" (or your device)
6. Generate an app password
7. Use this 16-character password in `EMAIL_PASSWORD` in your `.env` file

## Routes Available

### Admin Routes

- **POST** `/api/admin/register` - Register new admin (sends OTP email)
- **POST** `/api/admin/verify-otp` - Verify OTP and create admin account
- **POST** `/api/admin/login` - Admin login
- **GET** `/api/admin/sellers` - Get all sellers (requires auth)
- **PUT** `/api/admin/sellers/:id/approve` - Approve seller
- **PUT** `/api/admin/sellers/:id/reject` - Reject seller
- **PUT** `/api/admin/sellers/:id/block` - Block seller
- **DELETE** `/api/admin/sellers/:id` - Delete seller
- **GET** `/api/admin/all-admins` - Get all admins (requires auth)
- **PUT** `/api/admin/admins/:id/approve` - Approve admin
- **PUT** `/api/admin/admins/:id/reject` - Reject admin
- **PUT** `/api/admin/admins/:id/block` - Block admin
- **DELETE** `/api/admin/admins/:id` - Delete admin

### Auth Routes (Updated for Sellers with OTP)

- **POST** `/api/auth/register/seller` - Register seller (sends OTP email)
- **POST** `/api/auth/verify-otp/seller` - Verify seller OTP
- **POST** `/api/auth/login/seller` - Seller login (checks approval status)

## Frontend Pages

### Admin Pages
- `/register/admin` - Admin registration with OTP verification
- `/login/admin` - Admin login
- `/admin-dashboard` - Main admin dashboard with tabs:
  - Dashboard overview
  - Manage Sellers
  - Manage Admins
- `/account-status` - Status page after OTP verification

## Features Implemented

### Admin Registration & Approval
1. Admin registers with email, name, and password
2. OTP sent to their email
3. After OTP verification, admin account is created with status "pending"
4. Email sent to SUPER_ADMIN_EMAIL with new admin details and approval/rejection links
5. Existing admin approves/rejects in dashboard
6. Once approved, new admin can login

### Seller Registration & Approval
1. Seller registers with company name, owner name, email, and password
2. OTP sent to their email
3. After OTP verification, seller account created with status "pending"
4. Shows account status page: "Your account creation request has been sent to our team..."
5. Admin can approve, reject, block, or delete sellers
6. Once approved, seller can login and access dashboard

### Admin Dashboard
- **Manage Sellers**: View all sellers, filter by status, approve/reject/block/delete
- **Manage Admins**: View all admins, filter by status, approve/reject/block/delete
- **Dashboard Overview**: Quick statistics on sellers and admins

## Testing

1. Start the backend server
2. Register a new admin at `/register/admin`
3. Verify the OTP sent to your email
4. Login as existing admin to approve the new admin request
5. Once approved, the new admin can login
6. Same process for sellers

## Troubleshooting

- If OTP emails not sending: Check EMAIL_USER and EMAIL_PASSWORD in .env
- If login fails after approval: Clear localStorage and try again
- If database errors occur: Run the SQL commands to create missing tables
- For CORS issues: Ensure backend CORS is configured for http://localhost:3000
