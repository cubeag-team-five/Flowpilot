import React, { useEffect, useState } from "react";

interface SuperAdminUser {
  employeeId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  designation: string;
  password?: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  initials: string;
}

interface UserForm {
  employeeId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  designation: string;
  password: string;
}

const API_BASE_URL = "http://localhost:8080";


const USERS_API = `${API_BASE_URL}/api/superadmin/users`;

/*
 * JWT AUTHENTICATION
 *
 * Your login page should save the JWT in localStorage.
 * The fallback keys make this work if your login currently uses
 * token, jwt, or accessToken.
 */
const getToken = (): string | null => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken")
  );
};

const getAuthHeaders = (): HeadersInit => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

const roles = [
  "Super Admin",
  "Admin",
  "Project Manager",
  "Scrum Master",
  "Developer",
  "QA Engineer",
  "Viewer",
  "Business Analyst",
];

const departments = [
  "Leadership",
  "Operations",
  "Product",
  "Engineering",
  "Quality",
  "Management",
  "Design",
];

const designations = [
  "Director",
  "Administrator",
  "Project Manager",
  "Scrum Master",
  "Software Developer",
  "QA Engineer",
  "Business Analyst",
  "Viewer",
];

const emptyForm: UserForm = {
  employeeId: "",
  name: "",
  email: "",
  role: "",
  department: "",
  designation: "",
  password: "",
};

const SuperAdminUsers: React.FC = () => {
  const [users, setUsers] = useState<SuperAdminUser[]>([]);
  const [form, setForm] = useState<UserForm>(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null
  );

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * ============================================================
   * LOAD USERS
   * GET /api/superadmin/users
   * ============================================================
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(USERS_API, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }
        throw new Error(`Failed to load users (${response.status})`);
      }

      const data: SuperAdminUser[] = await response.json();

      setUsers(data);
    } catch (err) {
      console.error("Load users error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Load users when page opens
   */
  useEffect(() => {
    loadUsers();
  }, []);

  /*
   * ============================================================
   * FORM INPUT
   * ============================================================
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * ============================================================
   * OPEN ADD FORM
   * ============================================================
   */
  const handleAddUser = () => {
    setForm(emptyForm);
    setEditingEmployeeId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  /*
   * ============================================================
   * CANCEL FORM
   * ============================================================
   */
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingEmployeeId(null);
    setShowForm(false);
    setError("");
  };

  /*
   * ============================================================
   * CREATE USER
   * POST /api/superadmin/users
   * ============================================================
   */
  const createUser = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(USERS_API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          employeeId: form.employeeId.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role,
          department: form.department,
          designation: form.designation,
          password: form.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }

        let message = "Failed to create user.";

        try {
          const data = await response.json();

          if (data.message) {
            message = data.message;
          } else if (data.error) {
            message = data.error;
          }
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(message);
      }

      const createdUser: SuperAdminUser = await response.json();

      /*
       * Add newly-created user immediately to table.
       */
      setUsers((previous) => [...previous, createdUser]);

      setSuccess("User created successfully.");

      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      console.error("Create user error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create user."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * ============================================================
   * UPDATE USER
   * PUT /api/superadmin/users/{employeeId}
   * ============================================================
   */
  const updateUser = async () => {
    if (!editingEmployeeId) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${USERS_API}/${encodeURIComponent(editingEmployeeId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: form.employeeId.trim(),
            name: form.name.trim(),
            email: form.email.trim(),
            role: form.role,
            department: form.department,
            designation: form.designation,

            /*
             * Backend treats password as optional during update.
             */
            password: form.password.trim() || null,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }

        let message = "Failed to update user.";

        try {
          const data = await response.json();

          if (data.message) {
            message = data.message;
          } else if (data.error) {
            message = data.error;
          }
        } catch {
          // Ignore
        }

        throw new Error(message);
      }

      const updatedUser: SuperAdminUser = await response.json();

      setUsers((previous) =>
        previous.map((user) =>
          user.employeeId === editingEmployeeId
            ? updatedUser
            : user
        )
      );

      setSuccess("User updated successfully.");

      setForm(emptyForm);
      setEditingEmployeeId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Update user error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update user."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * ============================================================
   * CREATE / UPDATE SUBMIT
   * ============================================================
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.employeeId.trim()) {
      setError("Employee ID is required.");
      return;
    }

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!form.role) {
      setError("Please select a role.");
      return;
    }

    if (!form.department) {
      setError("Please select a department.");
      return;
    }

    if (!form.designation) {
      setError("Please select a designation.");
      return;
    }

    /*
     * Password is mandatory while creating.
     */
    if (!editingEmployeeId && !form.password.trim()) {
      setError("Password is required.");
      return;
    }

    if (!editingEmployeeId && form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (editingEmployeeId) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  /*
   * ============================================================
   * EDIT USER
   * GET /api/superadmin/users/{employeeId}
   * ============================================================
   */
  const handleEdit = async (employeeId: string) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${USERS_API}/${encodeURIComponent(employeeId)}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }
        throw new Error("Unable to load user details.");
      }

      const user: SuperAdminUser = await response.json();

      setForm({
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        password: "",
      });

      setEditingEmployeeId(user.employeeId);
      setShowForm(true);
    } catch (err) {
      console.error("Edit user error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load user."
      );
    }
  };

  /*
   * ============================================================
   * ENABLE / DISABLE
   * PATCH /api/superadmin/users/{employeeId}/status
   * ============================================================
   */
  const handleToggleStatus = async (
    employeeId: string
  ) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${USERS_API}/${encodeURIComponent(employeeId)}/status`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }
        throw new Error("Unable to change user status.");
      }

      const updatedUser: SuperAdminUser = await response.json();

      setUsers((previous) =>
        previous.map((user) =>
          user.employeeId === employeeId
            ? updatedUser
            : user
        )
      );

      setSuccess(
        updatedUser.status === "Active"
          ? "User enabled successfully."
          : "User disabled successfully."
      );
    } catch (err) {
      console.error("Toggle status error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to change user status."
      );
    }
  };

  /*
   * ============================================================
   * DELETE USER
   * DELETE /api/superadmin/users/{employeeId}
   * ============================================================
   */
  const handleDelete = async (employeeId: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employeeId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${USERS_API}/${encodeURIComponent(employeeId)}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }
        throw new Error("Unable to delete user.");
      }

      setUsers((previous) =>
        previous.filter(
          (user) => user.employeeId !== employeeId
        )
      );

      setSuccess("User deleted successfully.");
    } catch (err) {
      console.error("Delete user error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete user."
      );
    }
  };

  /*
   * ============================================================
   * SEARCH
   * ============================================================
   */
  const query = search.toLowerCase().trim();

  const filteredUsers = users.filter((user) => {
    if (!query) {
      return true;
    }

    return (
      user.employeeId.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query) ||
      user.designation.toLowerCase().includes(query)
    );
  });

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  /*
   * ============================================================
   * COMPONENT
   * ============================================================
   */
  return (
    <div className="super-admin-users-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .super-admin-users-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #14213d;
          font-family: Inter, Arial, sans-serif;
        }

        .users-content {
          padding: 28px 32px 50px;
        }

        .users-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          gap: 20px;
        }

        .users-title {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: #111827;
        }

        .users-date {
          margin-top: 5px;
          color: #8aa0bf;
          font-size: 14px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .search-box {
          width: 245px;
          height: 44px;
          border: 1px solid #dce4ef;
          border-radius: 24px;
          background: white;
          padding: 0 16px;
          outline: none;
          color: #1f2937;
          font-size: 14px;
        }

        .search-box:focus {
          border-color: #ff3040;
        }

        .top-summary {
          background: #ffffff;
          border-radius: 12px;
          padding: 18px 20px;
          margin-bottom: 18px;
          border: 1px solid #e5eaf1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .member-count {
          color: #6480a4;
          font-size: 15px;
          font-weight: 600;
        }

        .add-button {
          border: none;
          background: #ff3040;
          color: white;
          height: 48px;
          padding: 0 27px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 5px 12px rgba(255, 48, 64, 0.18);
        }

        .add-button:hover {
          background: #e92535;
        }

        .form-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 28px 30px;
          margin-bottom: 18px;
        }

        .form-title {
          margin: 0 0 22px;
          font-size: 18px;
          font-weight: 800;
          color: #152238;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 800;
          color: #355477;
          text-transform: uppercase;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          height: 44px;
          border: 1px solid #d7e0eb;
          border-radius: 9px;
          padding: 0 13px;
          font-size: 14px;
          color: #243b5a;
          background: white;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #ff3040;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .create-button {
          height: 44px;
          border: none;
          background: #ff3040;
          color: white;
          border-radius: 9px;
          padding: 0 22px;
          font-weight: 700;
          cursor: pointer;
        }

        .create-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-button {
          height: 44px;
          border: 1px solid #d7e0eb;
          background: white;
          color: #516a88;
          border-radius: 9px;
          padding: 0 22px;
          font-weight: 700;
          cursor: pointer;
        }

        .message {
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 600;
        }

        .error-message {
          color: #b42318;
          background: #fff1f0;
          border: 1px solid #ffd4d1;
        }

        .success-message {
          color: #087443;
          background: #edfff6;
          border: 1px solid #bcefd5;
        }

        .table-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1050px;
        }

        .users-table th {
          text-align: left;
          padding: 17px 16px;
          color: #66809f;
          font-size: 12px;
          font-weight: 800;
          border-bottom: 1px solid #e7edf4;
          white-space: nowrap;
        }

        .users-table td {
          padding: 13px 16px;
          border-bottom: 1px solid #edf1f5;
          font-size: 14px;
          color: #294766;
          white-space: nowrap;
        }

        .users-table tr:last-child td {
          border-bottom: none;
        }

        .employee-id {
          color: #6280a5;
          font-weight: 700;
        }

        .user-name {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #101b2e;
          font-weight: 800;
        }

        .initials {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #edf2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5d7490;
          font-size: 12px;
          font-weight: 800;
        }

        .role-badge {
          display: inline-flex;
          padding: 8px 11px;
          border-radius: 8px;
          background: #eef1f4;
          color: #3e5b7b;
          font-weight: 700;
          font-size: 12px;
        }

        .status-badge {
          display: inline-flex;
          padding: 7px 13px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 800;
        }

        .status-active {
          background: #dff7ea;
          color: #00864b;
        }

        .status-inactive {
          background: #edf0f3;
          color: #718096;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-button {
          height: 36px;
          border-radius: 9px;
          padding: 0 13px;
          background: white;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .edit-button {
          color: #00a86b;
          border: 1px solid #a7ead0;
        }

        .edit-button:hover {
          background: #effdf7;
        }

        .disable-button {
          color: #e88600;
          border: 1px solid #ffd69a;
        }

        .enable-button {
          color: #00a86b;
          border: 1px solid #a7ead0;
        }

        .delete-button {
          color: #ef4444;
          border: 1px solid #ffc5c5;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #7185a0;
        }

        .empty {
          text-align: center;
          padding: 40px;
          color: #7185a0;
        }

        @media (max-width: 900px) {
          .users-content {
            padding: 20px;
          }

          .users-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .header-right {
            width: 100%;
          }

          .search-box {
            width: 100%;
          }

          .top-summary {
            align-items: stretch;
            flex-direction: column;
          }

          .add-button {
            width: 100%;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .users-content {
            padding: 14px;
          }

          .users-title {
            font-size: 23px;
          }

          .form-card {
            padding: 20px;
          }
        }
      `}</style>

      <main className="users-content">
        {/* HEADER */}
        <div className="users-header">
          <div>
            <h1 className="users-title">User Management</h1>
            <div className="users-date">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="header-right">
            <input
              className="search-box"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>

        {/* MESSAGES */}
        {error && (
          <div className="message error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="message success-message">
            {success}
          </div>
        )}

        {/* SUMMARY */}
        <div className="top-summary">
          <div className="member-count">
            {users.length} total members&nbsp; · &nbsp;
            {activeUsers} active
          </div>

          <button
            type="button"
            className="add-button"
            onClick={handleAddUser}
          >
            +&nbsp; Add User
          </button>
        </div>

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="form-card">
            <h2 className="form-title">
              {editingEmployeeId
                ? "Edit User"
                : "Add New User"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* EMPLOYEE ID */}
                <div className="form-group">
                  <label>Employee ID</label>

                  <input
                    type="text"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleInputChange}
                    placeholder="Employee ID"
                    disabled={Boolean(editingEmployeeId)}
                  />
                </div>

                {/* NAME */}
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                  />
                </div>

                {/* ROLE */}
                <div className="form-group">
                  <label>Role</label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select Role
                    </option>

                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DEPARTMENT */}
                <div className="form-group">
                  <label>Department</label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select Department
                    </option>

                    {departments.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DESIGNATION */}
                <div className="form-group">
                  <label>Designation</label>

                  <select
                    name="designation"
                    value={form.designation}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select Designation
                    </option>

                    {designations.map((designation) => (
                      <option
                        key={designation}
                        value={designation}
                      >
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder={
                      editingEmployeeId
                        ? "Leave blank to keep current password"
                        : "Password"
                    }
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="create-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingEmployeeId
                    ? "Update User"
                    : "Create User"}
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* USERS TABLE */}
        <div className="table-card">
          {loading ? (
            <div className="loading">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="empty">
              {search
                ? "No users found for your search."
                : "No users available."}
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>EMPLOYEE ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>DEPARTMENT</th>
                  <th>STATUS</th>
                  <th>LAST LOGIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.employeeId}>
                    {/* EMPLOYEE ID */}
                    <td>
                      <span className="employee-id">
                        {user.employeeId}
                      </span>
                    </td>

                    {/* NAME */}
                    <td>
                      <div className="user-name">
                        <div className="initials">
                          {user.initials ||
                            user.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                        </div>

                        <span>{user.name}</span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td>{user.email}</td>

                    {/* ROLE */}
                    <td>
                      <span className="role-badge">
                        {user.role}
                      </span>
                    </td>

                    {/* DEPARTMENT */}
                    <td>{user.department}</td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status-badge ${
                          user.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* LAST LOGIN */}
                    <td>{user.lastLogin || "Never"}</td>

                    {/* ACTIONS */}
                    <td>
                      <div className="actions">
                        <button
                          type="button"
                          className="action-button edit-button"
                          onClick={() =>
                            handleEdit(user.employeeId)
                          }
                        >
                          ✎ Edit
                        </button>

                        <button
                          type="button"
                          className={`action-button ${
                            user.status === "Active"
                              ? "disable-button"
                              : "enable-button"
                          }`}
                          onClick={() =>
                            handleToggleStatus(
                              user.employeeId
                            )
                          }
                        >
                          {user.status === "Active"
                            ? "Disable"
                            : "Enable"}
                        </button>

                        {user.status === "Inactive" && (
                          <button
                            type="button"
                            className="action-button delete-button"
                            onClick={() =>
                              handleDelete(
                                user.employeeId
                              )
                            }
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default SuperAdminUsers;