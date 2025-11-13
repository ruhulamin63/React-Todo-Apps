import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/usersSlice";
import { showModal } from "../../features/ui/modalSlice";
import Button from "../common/Button";
import CommonTable from "../common/CommonTable";

export default function UserList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.users);

  const users = list.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));

  const columns = [
    { label: "ID", field: "id" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Status", field: "is_active", 
      render: (value) => (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium 
              ${value ? 
                'bg-green-100 text-green-800' : 
                'bg-red-100 text-red-800'
              }`
            }
          >
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const handleEdit = (user) => {
    dispatch(showModal({ mode: "edit", props: { user } }));
  };

  const handleDelete = (user) => {
    dispatch(showModal({ mode: "confirmDelete", props: { user } }));
  };
  
  const handleDetails = (user) => {
    dispatch(showModal({ mode: "details", props: { user } }));
  }

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (loading) return (
    <div className="flex items-center justify-center py-8">
      <div className="text-gray-600">Loading users...</div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-700">Error: {String(error)}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        <Button
          onClick={() => dispatch(showModal({ mode: "create" }))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          + Add User
        </Button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first user.</p>
          <Button
            onClick={() => dispatch(showModal({ mode: "create" }))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Add First User
          </Button>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <CommonTable 
            columns={columns} 
            data={users} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            renderActions={(row) => (
              <>
                <button
                  onClick={() => handleDetails(row)}
                  className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Details
                </button>
                
                <button
                  onClick={() => handleEdit(row)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                
                <button
                  onClick={() => handleDelete(row)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}