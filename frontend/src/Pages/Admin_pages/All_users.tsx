import { useEffect, useState } from "react";
import { useAll_usersQuery, useChange_roleMutation, useDelete_usersMutation } from "../../Redux/Api";
import DataTable from "../../Components/shared/DataTable";
import Avatar from "../../Components/shared/Avatar";
import Badge from "../../Components/shared/Badge";
import Button from "../../Components/shared/Button";
import { HiTrash, HiUsers } from "react-icons/hi2";
import { toast } from "react-toastify";

function All_users() {
  const { data, isLoading } = useAll_usersQuery();
  const [changeRole] = useChange_roleMutation();
  const [deleteUser] = useDelete_usersMutation();
  
  const [roleData, setRoleData] = useState({
    role: "",
    id: ""
  });

  useEffect(() => {
    if (roleData.id && roleData.role) {
      changeRole(roleData);
      toast.success("Role updated successfully");
    }
  }, [roleData, changeRole]);

  const handleRoleChange = (userId, newRole) => {
    setRoleData({ role: newRole, id: userId });
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      toast.success("User deleted successfully");
    }
  };

  const users = data?.users || [];

  const columns = [
    {
      header: "User",
      accessor: "name",
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar src={user.image} alt={user.name || user.email} size="md" />
          <div>
            <p className="font-semibold text-brand-primary">{user.name || "No Name"}</p>
            <p className="text-sm text-brand-muted">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      render: (user) => (
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      header: "Status",
      accessor: "role",
      render: (user) => (
        <Badge variant={user.role === 'admin' ? 'primary' : 'default'}>
          {user.role === 'admin' ? 'Administrator' : 'Regular User'}
        </Badge>
      ),
    },
    {
      header: "Joined",
      accessor: "createdAt",
      sortable: true,
      render: (user) => (
        <div className="text-sm text-brand-muted">
          {new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      render: (user) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDeleteUser(user._id)}
          className="flex items-center gap-1"
        >
          <HiTrash /> Delete
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="h-64 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <HiUsers className="text-3xl text-brand-accent" />
          <h1 className="text-3xl font-bold text-brand-primary">User Management</h1>
        </div>
        <p className="text-brand-muted">Manage user accounts and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-brand-muted mb-1">Total Users</p>
          <p className="text-2xl font-bold text-brand-primary">{users.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-brand-muted mb-1">Administrators</p>
          <p className="text-2xl font-bold text-brand-primary">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-brand-muted mb-1">Regular Users</p>
          <p className="text-2xl font-bold text-brand-primary">
            {users.filter(u => u.role === 'user').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card p-6">
        <DataTable
          data={users}
          columns={columns}
          searchable
          searchPlaceholder="Search users by name or email..."
          emptyMessage="No users found"
        />
      </div>
    </div>
  );
}

export default All_users;
