import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RoleBadge({ role }) {
  const normalized = (role || "user").toLowerCase();

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        normalized === "admin"
          ? "bg-[#8A5FBF]/10 text-[#8A5FBF] border-[#D9C2F0]"
          : "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </span>
  );
}

function ChangeRoleModal({ user, close, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || "user");

  useEffect(() => {
    setSelectedRole(user?.role || "user");
  }, [user]);

  if (!user) return null;

  const updateRole = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/role`,
        {
          email: user.email,
          role: selectedRole,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success(response.data.message || "Role updated successfully");
      onUpdated();
      close();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative border border-[#EADCF8]">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition"
        >
          ✕
        </button>

        <div className="w-16 h-16 mx-auto rounded-full bg-[#D9C2F0]/40 flex items-center justify-center text-2xl mb-4">
          👤
        </div>

        <h2 className="text-xl font-bold text-center text-[#2F2A2E]">
          Change User Role
        </h2>

        <p className="text-sm text-center text-gray-500 mt-2 mb-6">
          Update role for <span className="font-semibold">{user.email}</span>
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl bg-[#FCF8FF] border border-[#EADCF8] p-4">
            <p className="text-sm text-gray-500">Current Role</p>
            <p className="mt-1 font-semibold text-[#2F2A2E]">{user.role}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select New Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#D9C2F0] focus:outline-none focus:ring-2 focus:ring-[#8A5FBF] bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            onClick={updateRole}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#8A5FBF] text-white font-semibold hover:bg-[#7448aa] transition disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/login");
      return;
    }

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/all`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUsers(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Failed to load users");
        setLoading(false);
      });
  }, [navigate, reload]);

  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user?.fristName || ""} ${user?.lastName || ""}`.toLowerCase();
    const email = (user?.email || "").toLowerCase();
    const role = (user?.role || "").toLowerCase();
    const keyword = search.toLowerCase();

    return (
      fullName.includes(keyword) ||
      email.includes(keyword) ||
      role.includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-[#FCF8FF] p-3 sm:p-6">
      {selectedUser && (
        <ChangeRoleModal
          user={selectedUser}
          close={() => setSelectedUser(null)}
          onUpdated={() => setReload((prev) => !prev)}
        />
      )}

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#8A5FBF]">
          User Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View all users and change their roles
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#EADCF8] mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name, email or role..."
          className="px-4 py-3 border border-[#D9C2F0] rounded-2xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#8A5FBF]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-[#FCF8FF] border border-[#EADCF8] text-sm text-gray-600">
            Total Users:{" "}
            <span className="font-bold text-[#8A5FBF]">{users.length}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-[#D9C2F0] border-t-[#8A5FBF] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-[#EADCF8] overflow-x-auto">
            <table className="min-w-[850px] w-full text-sm">
              <thead className="bg-[#D9C2F0]/40 text-gray-700">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Email Verified</th>
                  <th className="p-4 text-left">Blocked</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id || user.email || index}
                    className="border-t hover:bg-[#FCF8FF] transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.image || "https://i.pravatar.cc/300"}
                          alt="user"
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-[#2F2A2E]">
                            {user?.fristName || "No"} {user?.lastName || "Name"}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {user?._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-gray-600">{user?.email}</td>

                    <td className="p-4">
                      <RoleBadge role={user?.role} />
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          user?.isEmailVerified
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {user?.isEmailVerified ? "Verified" : "Not Verified"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          user?.isBlock
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}
                      >
                        {user?.isBlock ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-4 py-2 rounded-xl bg-[#8A5FBF] text-white font-medium hover:bg-[#7448aa] transition"
                      >
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No users found
            </div>
          )}
        </>
      )}
    </div>
  );
}