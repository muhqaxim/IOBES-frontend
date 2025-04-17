import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaSearch, FaBell, FaUserCircle, FaEdit, 
  FaTrash, FaCheck, FaBan, FaHistory, FaUserPlus, FaFilter
} from 'react-icons/fa';
import AdminLayout from './AdminLayout';

// Sample JSON data for faculty
const sampleFacultyData = {
  faculty: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sjohnson@university.edu",
      department: "Computer Science",
      courses: 4,
      assignments: 15,
      quizzes: 8,
      status: "Active",
      lastActive: "15 minutes ago"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "mchen@university.edu",
      department: "Software Engineering",
      courses: 3,
      assignments: 12,
      quizzes: 5,
      status: "Active",
      lastActive: "2 hours ago"
    },
    {
      id: 3,
      name: "Dr. Robert Garcia",
      email: "rgarcia@university.edu",
      department: "Data Science",
      courses: 2,
      assignments: 8,
      quizzes: 6,
      status: "Active",
      lastActive: "3 hours ago"
    },
    {
      id: 4,
      name: "Prof. Amanda Lee",
      email: "alee@university.edu",
      department: "Artificial Intelligence",
      courses: 3,
      assignments: 10,
      quizzes: 7,
      status: "Active",
      lastActive: "5 hours ago"
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      email: "jwilson@university.edu",
      department: "Computer Science",
      courses: 4,
      assignments: 16,
      quizzes: 9,
      status: "Inactive",
      lastActive: "2 days ago"
    },
    {
      id: 6,
      name: "Prof. Emily Thompson",
      email: "ethompson@university.edu",
      department: "Networking",
      courses: 2,
      assignments: 7,
      quizzes: 4,
      status: "Active",
      lastActive: "1 day ago"
    }
  ],
  departments: [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Networking"
  ],
  currentUser: {
    name: "Admin User",
    notifications: 3
  }
};

const FacultyManagement = () => {
  const [data, setData] = useState(sampleFacultyData);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Simulate fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch data from your API here
        // const response = await fetch('/api/faculty');
        // const jsonData = await response.json();
        // setData(jsonData);
        
        // Using sample data for now
        setData(sampleFacultyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setLoading(false);
      }
    };
    
    // Simulate API delay
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredFaculty = data.faculty.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'All' || faculty.department === filterDepartment;
    const matchesStatus = filterStatus === 'All' || faculty.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleOpenEditModal = (faculty) => {
    setSelectedFaculty(faculty);
    setShowEditModal(true);
  };

  const handleOpenActivityModal = (faculty) => {
    setSelectedFaculty(faculty);
    setShowActivityModal(true);
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setData({
      ...data,
      faculty: data.faculty.map(faculty => 
        faculty.id === id ? {...faculty, status: newStatus} : faculty
      )
    });
  };

  if (loading) {
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
              {data.currentUser.notifications > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
              )}
            </button>
            <div className="ml-4 flex items-center">
              <FaUserCircle className="h-8 w-8 text-darktext" />
              <span className="ml-2 text-darktext font-medium">{data.currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Faculty Management Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-darktext">Faculty Management</h1>
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
                className="border border-gray-300 bg-primary rounded-lg px-3 py-2 text-sm"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                {data.departments.map((department, index) => (
                  <option key={index} value={department}>{department}</option>
                ))}
              </select>
              
              <select 
                className="border border-gray-300 bg-primary rounded-lg px-3 py-2 text-sm"
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
                  setFilterDepartment('All');
                  setFilterStatus('All');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Faculty Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead className="bg-blue-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Assignments
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Quizzes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-darktext uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {filteredFaculty.map(faculty => (
                  <tr key={faculty.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUserCircle className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-darktext">{faculty.name}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {faculty.assignments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {faculty.quizzes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        faculty.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
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
                          onClick={() => handleStatusToggle(faculty.id, faculty.status)}
                          className={`${faculty.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                          title={faculty.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {faculty.status === 'Active' ? <FaBan /> : <FaCheck />}
                        </button>
                        <button 
                          onClick={() => handleOpenActivityModal(faculty)}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Activity"
                        >
                          <FaHistory />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredFaculty.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No faculty members found matching your filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-darktext">Add New Faculty</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  {data.departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="status" value="active" className="h-4 w-4 text-primary" defaultChecked />
                    <span className="ml-2 text-sm">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="status" value="inactive" className="h-4 w-4 text-primary" />
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
                  type="button" 
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
              <h2 className="text-xl font-semibold text-darktext">Edit Faculty</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue={selectedFaculty.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  defaultValue={selectedFaculty.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue={selectedFaculty.department}
                >
                  {data.departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="active" 
                      className="h-4 w-4 text-primary" 
                      defaultChecked={selectedFaculty.status === 'Active'}
                    />
                    <span className="ml-2 text-sm">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="inactive" 
                      className="h-4 w-4 text-primary" 
                      defaultChecked={selectedFaculty.status === 'Inactive'}
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
                  type="button" 
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
              <h2 className="text-xl font-semibold text-darktext">Activity Logs: {selectedFaculty.name}</h2>
              <button onClick={() => setShowActivityModal(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {/* Sample activity logs - would be fetched from API in real app */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">Created Assignment</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Created "Database Design Project" for Advanced Database Systems</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 16, 2025 - 14:35</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">Added Questions</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Added 15 new questions to Question Bank for Advanced Database Systems</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 16, 2025 - 13:22</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">Login</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Logged into the system from 192.168.1.45</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 16, 2025 - 09:17</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">Modified Quiz</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Updated "Midterm Review Quiz" for Advanced Database Systems</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 15, 2025 - 16:08</td>
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
}

export default FacultyManagement;