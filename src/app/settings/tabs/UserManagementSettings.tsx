import React from "react";
import { PlusCircle, Users, UserPlus, Search, Edit, Trash2 } from "lucide-react";

const UserManagementSettings = () => {
  // Mock user data
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sam Wilson", email: "sam@example.com", role: "User", status: "Active" },
    { id: 3, name: "Taylor Smith", email: "taylor@example.com", role: "Editor", status: "Invited" },
    { id: 4, name: "Jordan Lee", email: "jordan@example.com", role: "User", status: "Active" },
    { id: 5, name: "Casey Brown", email: "casey@example.com", role: "Viewer", status: "Inactive" },
  ];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      
      <div className="space-y-6">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-64 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <button className="w-full sm:w-auto px-4 py-2 bg-[#0B51A6] text-white rounded-md inline-flex items-center text-sm font-medium">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </button>
        </div>
        
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : user.status === "Invited" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Roles Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-md font-medium mb-4">Role Management</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Admin</h4>
                <button className="text-sm text-blue-600">Edit Permissions</button>
              </div>
              <p className="text-sm text-gray-500">Full access to all system features and settings</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Editor</h4>
                <button className="text-sm text-blue-600">Edit Permissions</button>
              </div>
              <p className="text-sm text-gray-500">Can create and edit content, but cannot modify system settings</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">User</h4>
                <button className="text-sm text-blue-600">Edit Permissions</button>
              </div>
              <p className="text-sm text-gray-500">Standard user with basic access to the platform</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Viewer</h4>
                <button className="text-sm text-blue-600">Edit Permissions</button>
              </div>
              <p className="text-sm text-gray-500">Read-only access to content, cannot make any changes</p>
            </div>
            
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Custom Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementSettings; 