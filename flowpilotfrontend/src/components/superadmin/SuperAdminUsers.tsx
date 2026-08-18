import React, { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  initials: string;
}

const initialUsers: User[] = [
  {
    id: 'EMP-001',
    name: 'Rajeev Kumar',
    email: 'ra.kumar@ipmt.com',
    role: 'Super Admin',
    department: 'Leadership',
    status: 'Active',
    lastLogin: '2 min ago',
    initials: 'RK',
  },
  {
    id: 'EMP-002',
    name: 'Nisha Agarwal',
    email: 'n.agarwal@ipmt.com',
    role: 'Admin',
    department: 'Operations',
    status: 'Active',
    lastLogin: '12 min ago',
    initials: 'NA',
  },
  {
    id: 'EMP-003',
    name: 'Arjun Shah',
    email: 'a.shah@ipmt.com',
    role: 'Project Manager',
    department: 'Product',
    status: 'Active',
    lastLogin: '1h ago',
    initials: 'AS',
  },
  {
    id: 'EMP-004',
    name: 'Aryan Kapoor',
    email: 'a.kapoor@ipmt.com',
    role: 'Scrum Master',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '30 min ago',
    initials: 'AK',
  },
  {
    id: 'EMP-005',
    name: 'Sneha Rao',
    email: 's.rao@ipmt.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '5 min ago',
    initials: 'SR',
  },
  {
    id: 'EMP-006',
    name: 'Mihir Khatri',
    email: 'm.khatri@ipmt.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '20 min ago',
    initials: 'MK',
  },
  {
    id: 'EMP-007',
    name: 'Priya Rajan',
    email: 'p.rajan@ipmt.com',
    role: 'QA Engineer',
    department: 'Quality',
    status: 'Active',
    lastLogin: '3h ago',
    initials: 'PR',
  },
  {
    id: 'EMP-008',
    name: 'Vikram Jain',
    email: 'v.jain@ipmt.com',
    role: 'Viewer',
    department: 'Management',
    status: 'Active',
    lastLogin: 'Yesterday',
    initials: 'VJ',
  },
  {
    id: 'EMP-009',
    name: 'Divya Mehta',
    email: 'd.mehta@ipmt.com',
    role: 'Developer',
    department: 'Design',
    status: 'Inactive',
    lastLogin: '3 days ago',
    initials: 'DM',
  },
  {
    id: 'EMP-010',
    name: 'Rohit Varma',
    email: 'r.varma@ipmt.com',
    role: 'Business Analyst',
    department: 'Product',
    status: 'Active',
    lastLogin: '2h ago',
    initials: 'RV',
  },
];

const roles = [
  'Super Admin',
  'Admin',
  'Project Manager',
  'Scrum Master',
  'Developer',
  'QA Engineer',
  'Viewer',
  'Business Analyst',
];

const departments = [
  'Leadership',
  'Operations',
  'Product',
  'Engineering',
  'Quality',
  'Management',
  'Design',
];

const designations = [
  'Software Engineer',
  'Senior Software Engineer',
  'Project Manager',
  'Scrum Master',
  'QA Engineer',
  'Business Analyst',
  'UI/UX Designer',
  'Team Lead',
];

const SuperAdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    employeeId: '',
    role: '',
    department: '',
    designation: '',
  });

  const activeUsers = users.filter(
    (user) => user.status === 'Active'
  ).length;

  const openAddModal = () => {
    setEditingUser(null);

    setForm({
      name: '',
      email: '',
      employeeId: '',
      role: '',
      department: '',
      designation: '',
    });

    setShowForm(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      employeeId: user.id,
      role: user.role,
      department: user.department,
      designation: '',
    });

    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingUser(null);

    setForm({
      name: '',
      email: '',
      employeeId: '',
      role: '',
      department: '',
      designation: '',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.employeeId.trim() ||
      !form.role ||
      !form.department ||
      !form.designation
    ) {
      return;
    }

    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: form.name.trim(),
                email: form.email.trim(),
                role: form.role,
                department: form.department,
                initials: getInitials(form.name),
              }
            : user
        )
      );
    } else {
      const newUser: User = {
        id: form.employeeId.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        department: form.department,
        status: 'Active',
        lastLogin: 'Just now',
        initials: getInitials(form.name),
      };

      setUsers((current) => [...current, newUser]);
    }

    closeModal();
  };

  const toggleStatus = (id: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === 'Active'
                  ? 'Inactive'
                  : 'Active',
            }
          : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );
  };

  return (
    <>
      <style>{`
        .users-page {
          width: 100%;
          min-height: 100%;
          background: #f5f6f8;
          font-family: Inter, -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Arial, sans-serif;
          color: #111827;
          overflow-x: hidden;
        }

        .users-page *,
        .users-page *::before,
        .users-page *::after {
          box-sizing: border-box;
        }

        /* MAIN CONTENT */

        .users-content {
          width: 100%;
          padding: 0;
        }

        /* SUMMARY + ADD USER */

        .users-toolbar {
          width: 100%;
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .member-summary {
          font-size: 15px;
          line-height: 20px;
          font-weight: 500;
          color: #6c86a6;
        }

        .add-user-button {
          height: 46px;
          min-width: 159px;
          padding: 0 22px;
          border: none;
          border-radius: 11px;
          background: #ff2930;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(255, 41, 48, 0.16);
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .add-user-button:hover {
          background: #ed2027;
        }

        .add-user-button svg {
          width: 18px;
          height: 18px;
          stroke-width: 2.6;
        }

        /* TABLE CONTAINER */

        .users-table-container {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        /* TABLE */

        .users-table {
          width: 100%;
          min-width: 1100px;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .users-table th {
          height: 48px;
          padding: 0 18px;
          background: #ffffff;
          border-bottom: 1px solid #edf0f3;
          text-align: left;
          vertical-align: middle;
          font-size: 11px;
          line-height: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #7186a0;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .users-table td {
          height: 58px;
          padding: 0 18px;
          border-bottom: 1px solid #edf0f3;
          vertical-align: middle;
          font-size: 13px;
          color: #304d6d;
        }

        .users-table tbody tr:last-child td {
          border-bottom: none;
        }

        .users-table tbody tr:hover {
          background: #fafbfc;
        }

        /* COLUMNS */

        .employee-column {
          width: 11%;
        }

        .name-column {
          width: 14%;
        }

        .email-column {
          width: 16%;
        }

        .role-column {
          width: 13%;
        }

        .department-column {
          width: 11%;
        }

        .status-column {
          width: 8%;
        }

        .login-column {
          width: 10%;
        }

        .actions-column {
          width: 17%;
        }

        /* EMPLOYEE ID */

        .employee-id {
          color: #7188a4;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
        }

        /* NAME */

        .name-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          min-width: 36px;
          border-radius: 50%;
          background: #edf2f7;
          color: #607994;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .user-name {
          font-size: 14px;
          line-height: 18px;
          font-weight: 700;
          color: #101828;
          white-space: nowrap;
        }

        /* EMAIL */

        .user-email {
          display: block;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: #3f5f80;
        }

        /* ROLE */

        .role-badge {
          display: inline-flex;
          align-items: center;
          min-height: 29px;
          max-width: 115px;
          padding: 5px 9px;
          border-radius: 7px;
          background: #f0f2f4;
          color: #405a76;
          font-size: 12px;
          line-height: 15px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* DEPARTMENT */

        .department {
          font-size: 13px;
          color: #304d6d;
          white-space: nowrap;
        }

        /* STATUS */

        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 61px;
          height: 25px;
          padding: 0 9px;
          border-radius: 7px;
          font-size: 12px;
          line-height: 15px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status-active {
          background: #def5e8;
          color: #07934a;
        }

        .status-inactive {
          background: #eef0f2;
          color: #7b8794;
        }

        /* LAST LOGIN */

        .last-login {
          color: #7890aa;
          font-size: 13px;
          white-space: nowrap;
        }

        /* ACTIONS */

        .action-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .action-button {
          height: 32px;
          padding: 0 11px;
          border-radius: 8px;
          background: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-family: inherit;
          font-size: 12px;
          line-height: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .action-button svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .edit-button {
          border: 1px solid #b8ead2;
          color: #079852;
        }

        .edit-button:hover {
          background: #effcf5;
        }

        .disable-button {
          border: 1px solid #f5d49d;
          color: #d77900;
        }

        .disable-button:hover {
          background: #fff8ec;
        }

        .delete-button {
          border: 1px solid #ffc5c9;
          color: #ef3038;
        }

        .delete-button:hover {
          background: #fff1f2;
        }

        /* ADD USER FORM */

        .add-user-form-card {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 16px;
          padding: 26px 28px 22px;
          margin-bottom: 16px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
        }

        .add-user-form-title {
          margin: 0 0 20px;
          font-size: 16px;
          line-height: 20px;
          font-weight: 750;
          color: #111827;
        }

        .add-user-fields {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 14px;
          row-gap: 16px;
        }

        .inline-form-group {
          min-width: 0;
        }

        .inline-form-label {
          display: block;
          margin-bottom: 7px;
          font-size: 11px;
          line-height: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #405a76;
          text-transform: uppercase;
        }

        .inline-form-input,
        .inline-form-select {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          border: 1px solid #dce2e8;
          border-radius: 9px;
          background: #ffffff;
          color: #18283c;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 18px;
        }

        .inline-form-input::placeholder {
          color: #98a3b1;
          opacity: 1;
        }

        .inline-form-input:focus,
        .inline-form-select:focus {
          border-color: #9bbfe0;
          box-shadow: 0 0 0 2px rgba(123, 185, 239, 0.08);
        }

        .inline-form-select {
          cursor: pointer;
        }

        .inline-form-actions {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: -1px;
        }

        .inline-create-button,
        .inline-cancel-button {
          height: 40px;
          padding: 0 19px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 13px;
          line-height: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .inline-create-button {
          border: 1px solid #ff2930;
          background: #ff2930;
          color: #ffffff;
          box-shadow: 0 5px 12px rgba(255, 41, 48, 0.13);
        }

        .inline-create-button:hover {
          background: #ed2027;
        }

        .inline-cancel-button {
          border: 1px solid #d7dfe8;
          background: #ffffff;
          color: #536b84;
        }

        .inline-cancel-button:hover {
          background: #f8fafc;
        }

        /* TABLET */

        @media (max-width: 1200px) {
          .users-content {
            padding: 18px 24px 25px;
          }

          .users-table th,
          .users-table td {
            padding-left: 12px;
            padding-right: 12px;
          }

          .user-avatar {
            width: 34px;
            height: 34px;
            min-width: 34px;
          }

          .user-name {
            font-size: 13px;
          }

          .user-email {
            font-size: 12px;
          }
        }

        /* SMALL TABLET */

        @media (max-width: 950px) {
          .users-content {
            padding: 18px 20px 25px;
          }

          .users-table-container {
            overflow-x: auto;
            overflow-y: hidden;
          }

          .users-table {
            min-width: 1100px;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {
          .users-content {
            padding: 16px 16px 24px;
          }

          .users-toolbar {
            height: auto;
            min-height: 0;
            margin-bottom: 14px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            gap: 12px;
          }

          .member-summary {
            font-size: 14px;
            line-height: 19px;
          }

          .add-user-button {
            width: 100%;
            height: 44px;
            min-width: 0;
            font-size: 14px;
          }

          .users-table-container {
            border-radius: 13px;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
          }

          .users-table {
            min-width: 1100px;
          }

          .users-table th {
            height: 46px;
            padding-left: 12px;
            padding-right: 12px;
          }

          .users-table td {
            height: 58px;
            padding-left: 12px;
            padding-right: 12px;
          }
        }

        /* SMALL MOBILE */

        @media (max-width: 480px) {
          .users-content {
            padding: 14px 12px 20px;
          }

          .users-toolbar {
            gap: 10px;
            margin-bottom: 12px;
          }

          .member-summary {
            font-size: 13px;
            line-height: 18px;
          }

          .add-user-button {
            height: 42px;
            border-radius: 10px;
            font-size: 13px;
          }

          .add-user-form-card {
            padding: 20px 16px 18px;
            border-radius: 13px;
          }

          .add-user-form-title {
            margin-bottom: 17px;
            font-size: 15px;
          }

          .add-user-fields {
            grid-template-columns: 1fr;
            row-gap: 14px;
          }

          .inline-form-actions {
            grid-column: auto;
            margin-top: 1px;
          }

          .inline-create-button,
          .inline-cancel-button {
            height: 39px;
            padding: 0 15px;
            font-size: 12px;
          }

          .users-table-container {
            border-radius: 12px;
          }
        }
      `}</style>

      <div className="users-page">

        <main className="users-content">

          <div className="users-toolbar">

            <div className="member-summary">
              {users.length} total members · {activeUsers} active
            </div>

            <button
              type="button"
              className="add-user-button"
              onClick={openAddModal}
            >
              <Plus />
              Add User
            </button>

          </div>

<<<<<<< HEAD
          {showForm && (
            <form className="add-user-form-card" onSubmit={handleSubmit}>
              <h2 className="add-user-form-title">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>

              <div className="add-user-fields">

                <div className="inline-form-group">
                  <label className="inline-form-label">Full Name</label>
                  <input
                    type="text"
                    className="inline-form-input"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="inline-form-group">
                  <label className="inline-form-label">Email Address</label>
                  <input
                    type="email"
                    className="inline-form-input"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="inline-form-group">
                  <label className="inline-form-label">Employee ID</label>
                  <input
                    type="text"
                    className="inline-form-input"
                    placeholder="Employee ID"
                    value={form.employeeId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        employeeId: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="inline-form-group">
                  <label className="inline-form-label">Role</label>
                  <select
                    className="inline-form-select"
                    value={form.role}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inline-form-group">
                  <label className="inline-form-label">Department</label>
                  <select
                    className="inline-form-select"
                    value={form.department}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        department: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inline-form-group">
                  <label className="inline-form-label">Designation</label>
                  <select
                    className="inline-form-select"
                    value={form.designation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        designation: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inline-form-actions">
                  <button
                    type="submit"
                    className="inline-create-button"
                  >
                    {editingUser ? 'Save Changes' : 'Create User'}
                  </button>

                  <button
                    type="button"
                    className="inline-cancel-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </form>
          )}

          <div className="users-table-container">
=======
          <div className="users-table-container hidden md:block">
>>>>>>> 87b681ce8f0ab047910fb1e75b4660dd0c142f26

            <table className="users-table">

              <colgroup>
                <col className="employee-column" />
                <col className="name-column" />
                <col className="email-column" />
                <col className="role-column" />
                <col className="department-column" />
                <col className="status-column" />
                <col className="login-column" />
                <col className="actions-column" />
              </colgroup>

              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr key={user.id}>

                    <td>
                      <span className="employee-id">
                        {user.id}
                      </span>
                    </td>

                    <td>
                      <div className="name-wrapper">

                        <div className="user-avatar">
                          {user.initials}
                        </div>

                        <span className="user-name">
                          {user.name}
                        </span>

                      </div>
                    </td>

                    <td>
                      <span className="user-email">
                        {user.email}
                      </span>
                    </td>

                    <td>
                      <span className="role-badge">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span className="department">
                        {user.department}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          user.status === 'Active'
                            ? 'status-active'
                            : 'status-inactive'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <span className="last-login">
                        {user.lastLogin}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          type="button"
                          className="action-button edit-button"
                          onClick={() => openEditModal(user)}
                        >
                          <Pencil />
                          Edit
                        </button>

                        {user.status === 'Active' ? (
                          <button
                            type="button"
                            className="action-button disable-button"
                            onClick={() => toggleStatus(user.id)}
                          >
                            Disable
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="action-button edit-button"
                              onClick={() =>
                                toggleStatus(user.id)
                              }
                            >
                              Enable
                            </button>

                            <button
                              type="button"
                              className="action-button delete-button"
                              onClick={() =>
                                deleteUser(user.id)
                              }
                            >
                              <Trash2 />
                              Delete
                            </button>
                          </>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 mt-1">
            {users.map((user) => (
              <div key={user.id} className="rounded-[14px] border border-[#e7eaf0] bg-white p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="user-avatar shrink-0">{user.initials}</div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-[#101828] truncate">{user.name}</div>
                      <div className="text-[11px] text-[#3f5f80] truncate">{user.email}</div>
                    </div>
                  </div>
                  <span className={`status-badge shrink-0 ${user.status === 'Active' ? 'status-active' : 'status-inactive'}`}>{user.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#304d6d] mb-3">
                  <div><span className="text-[#7186a0]">ID: </span>{user.id}</div>
                  <div><span className="text-[#7186a0]">Role: </span>{user.role}</div>
                  <div><span className="text-[#7186a0]">Dept: </span>{user.department}</div>
                  <div><span className="text-[#7186a0]">Login: </span>{user.lastLogin}</div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-[#edf0f3]">
                  <button type="button" className="action-button edit-button" onClick={() => openEditModal(user)}><Pencil />Edit</button>
                  {user.status === 'Active' ? (
                    <button type="button" className="action-button disable-button" onClick={() => toggleStatus(user.id)}>Disable</button>
                  ) : (
                    <>
                      <button type="button" className="action-button edit-button" onClick={() => toggleStatus(user.id)}>Enable</button>
                      <button type="button" className="action-button delete-button" onClick={() => deleteUser(user.id)}><Trash2 />Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

        </main>

      </div>
    </>
  );
};

export default SuperAdminUsers;