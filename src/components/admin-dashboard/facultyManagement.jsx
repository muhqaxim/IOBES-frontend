import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaCheck,
  FaBan,
  FaHistory,
  FaUserPlus,
  FaFilter,
  FaSpinner,
} from "react-icons/fa";
import AdminLayout from "./adminLayout";
import axios from "axios";
import { toast } from "react-toastify";

const FacultyManagement = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentUser, setCurrentUser] = useState({
    name: "Admin User",
    notifications: 3,
  });

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // List of departments (in a real app, this might come from the API)
  const departments = [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Networking",
  ];

  // Fetch faculty data from the API
  const fetchFacultyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/faculty`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      // Transform API data to match the component's expected format
      const transformedData = response.data.map((faculty) => ({
        id: faculty.id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department || "Not assigned", // This field might need adjustment based on your schema
        courses: faculty.courses?.length || 0,
        assignments: 0, // These fields are not provided by the API
        quizzes: 0, // You might want to fetch this data separately or adjust your API
        status: faculty.status || "Active",
        lastActive:
          faculty.lastActive ||
          new Date(faculty.createdAt).toLocaleDateString(),
        createdAt: faculty.createdAt,
      }));

      setFacultyData(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching faculty data:", err);
      setError("Failed to load faculty data. Please try again later.");
      toast.error("Failed to load faculty data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const filteredFaculty = facultyData.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faculty.department &&
        faculty.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment =
      filterDepartment === "All" || faculty.department === filterDepartment;
    const matchesStatus =
      filterStatus === "All" || faculty.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (faculty) => {
    setSelectedFaculty(faculty);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      password: "",
      confirmPassword: "",
    });
    setShowEditModal(true);
  };

  const handleOpenActivityModal = (faculty) => {
    setSelectedFaculty(faculty);
    setShowActivityModal(true);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/faculty/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setFacultyData(
        facultyData.map((faculty) =>
          faculty.id === id ? { ...faculty, status: newStatus } : faculty
        )
      );

      toast.success(`Faculty status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating faculty status:", err);
      toast.error("Failed to update faculty status");
    }
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/faculty`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Add the new faculty to the local state
      const newFaculty = {
        id: response.data.faculty.id,
        name: response.data.faculty.name,
        email: response.data.faculty.email,
        department: "Not assigned",
        courses: 0,
        assignments: 0,
        quizzes: 0,
        status: "Active",
        lastActive: "Just now",
        createdAt: new Date().toISOString(),
      };

      setFacultyData([...facultyData, newFaculty]);
      setShowAddModal(false);
      toast.success("Faculty added successfully");
    } catch (err) {
      console.error("Error adding faculty:", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message || "Failed to add faculty");
      } else {
        toast.error("Failed to add faculty. Please try again later.");
      }
    }
  };

  const handleEditFaculty = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updateData = {
      name: formData.name,
      email: formData.email,
    };

    // Only include password if it's provided
    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      updateData.password = formData.password;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/faculty/${selectedFaculty.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Update the faculty in the local state
      setFacultyData(
        facultyData.map((faculty) =>
          faculty.id === selectedFaculty.id
            ? {
                ...faculty,
                name: formData.name,
                email: formData.email,
              }
            : faculty
        )
      );

      setShowEditModal(false);
      toast.success("Faculty updated successfully");
    } catch (err) {
      console.error("Error updating faculty:", err);
      toast.error("Failed to update faculty");
    }
  };

  const handleDeleteFaculty = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this faculty member?")
    ) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/faculty/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Remove the faculty from the local state
      setFacultyData(facultyData.filter((faculty) => faculty.id !== id));
      toast.success("Faculty deleted successfully");
    } catch (err) {
      console.error("Error deleting faculty:", err);
      toast.error("Failed to delete faculty");
    }
  };

  if (loading && facultyData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Top Navigation */}
      <header className="bg-white shadow">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center rounded-lg bg-gray-100 p-2">
            <FaSearch className="h-5 w-5 text-gray-500" />
            <input
              className="ml-2 bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none relative">
              <FaBell className="h-6 w-6 text-darktext" />
              {currentUser.notifications > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
              )}
            </button>
            <div className="ml-4 flex items-center">
              <FaUserCircle className="h-8 w-8 text-darktext" />
              <span className="ml-2 text-darktext font-medium">
                {currentUser.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Faculty Management Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-darktext">
            Faculty Management
          </h1>
          <button
            onClick={handleOpenAddModal}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
          >
            <FaUserPlus className="mr-2" />
            Add New Faculty
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                className="border border-gray-300 text-primary rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setFilterDepartment("All");
                  setFilterStatus("All");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        {/* Faculty Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead className="bg-blue-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Courses
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Last Active
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-darktext uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {loading && facultyData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">
                      <FaSpinner className="animate-spin h-6 w-6 mx-auto text-primary" />
                    </td>
                  </tr>
                ) : (
                  filteredFaculty.map((faculty) => (
                    <tr key={faculty.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUserCircle className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-darktext">
                              {faculty.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {faculty.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {faculty.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {faculty.courses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            faculty.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {faculty.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {faculty.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(faculty)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusToggle(faculty.id, faculty.status)
                            }
                            className={`${
                              faculty.status === "Active"
                                ? "text-red-600 hover:text-red-900"
                                : "text-green-600 hover:text-green-900"
                            }`}
                            title={
                              faculty.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                            }
                          >
                            {faculty.status === "Active" ? (
                              <FaBan />
                            ) : (
                              <FaCheck />
                            )}
                          </button>
                          <button
                            onClick={() => handleOpenActivityModal(faculty)}
                            className="text-gray-600 hover:text-gray-900"
                            title="View Activity"
                          >
                            <FaHistory />
                          </button>
                          <button
                            onClick={() => handleDeleteFaculty(faculty.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!loading && filteredFaculty.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No faculty members found matching your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-darktext">
                Add New Faculty
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddFaculty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  {departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      className="h-4 w-4 text-primary"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      className="h-4 w-4 text-primary"
                    />
                    <span className="ml-2 text-sm">Inactive</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                >
                  Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Faculty Modal */}
      {showEditModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-darktext">
                Edit Faculty
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleEditFaculty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue={selectedFaculty.department}
                >
                  {departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      className="h-4 w-4 text-primary"
                      defaultChecked={selectedFaculty.status === "Active"}
                    />
                    <span className="ml-2 text-sm">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      className="h-4 w-4 text-primary"
                      defaultChecked={selectedFaculty.status === "Inactive"}
                    />
                    <span className="ml-2 text-sm">Inactive</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activity Logs Modal */}
      {showActivityModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-darktext">
                Activity Logs: {selectedFaculty.name}
              </h2>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {/* In a real app, this would be fetched from an API */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">
                      Created Assignment
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Created "Database Design Project" for Advanced Database
                      Systems
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      April 16, 2025 - 14:35
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">
                      Added Questions
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Added 15 new questions to Question Bank for Advanced
                      Database Systems
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      April 16, 2025 - 13:22
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">
                      Login
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Logged into the system from 192.168.1.45
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      April 16, 2025 - 09:17
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">
                      Modified Quiz
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Updated "Midterm Review Quiz" for Advanced Database
                      Systems
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      April 15, 2025 - 16:08
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowActivityModal(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default FacultyManagement;
