import React, { useState, useEffect } from 'react';
import { 
  FaBook, FaSearch, FaBell, FaUserCircle, FaEdit, 
  FaTrash, FaCheck, FaBan, FaUsers, FaPlus, FaFilter,
  FaCalendarAlt, FaChalkboardTeacher, FaClock
} from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import AddCourseModal from './modals/AddCourseModal';
import EditCourseModal from './modals/EditCourseModal';
import AssignFacultyModal from './modals/AssignFacultyModal';
import CourseDetailsModal from './modals/CourseDetailsModal';

// Sample JSON data for courses
const sampleCoursesData = {
  courses: [
    {
      id: 1,
      code: "CS101",
      title: "Introduction to Computer Science",
      department: "Computer Science",
      credits: 3,
      enrolledStudents: 120,
      assignedFaculty: [
        { id: 1, name: "Dr. Sarah Johnson" },
        { id: 2, name: "Prof. Michael Chen" }
      ],
      status: "Active",
      startDate: "January 15, 2025",
      endDate: "May 10, 2025",
      assignments: 8,
      quizzes: 4,
      cloCount: 12
    },
    {
      id: 2,
      code: "SE201",
      title: "Software Engineering Fundamentals",
      department: "Software Engineering",
      credits: 4,
      enrolledStudents: 85,
      assignedFaculty: [
        { id: 2, name: "Prof. Michael Chen" }
      ],
      status: "Active",
      startDate: "January 15, 2025",
      endDate: "May 10, 2025",
      assignments: 10,
      quizzes: 5,
      cloCount: 15
    },
    {
      id: 3,
      code: "DS220",
      title: "Data Science Principles",
      department: "Data Science",
      credits: 3,
      enrolledStudents: 70,
      assignedFaculty: [
        { id: 3, name: "Dr. Robert Garcia" }
      ],
      status: "Active",
      startDate: "January 15, 2025",
      endDate: "May 10, 2025",
      assignments: 6,
      quizzes: 3,
      cloCount: 10
    },
    {
      id: 4,
      code: "AI301",
      title: "Artificial Intelligence Methods",
      department: "Artificial Intelligence",
      credits: 4,
      enrolledStudents: 55,
      assignedFaculty: [
        { id: 4, name: "Prof. Amanda Lee" }
      ],
      status: "Active",
      startDate: "January 15, 2025",
      endDate: "May 10, 2025",
      assignments: 7,
      quizzes: 4,
      cloCount: 14
    },
    {
      id: 5,
      code: "CS301",
      title: "Advanced Database Systems",
      department: "Computer Science",
      credits: 3,
      enrolledStudents: 65,
      assignedFaculty: [
        { id: 5, name: "Dr. James Wilson" }
      ],
      status: "Inactive",
      startDate: "August 20, 2025",
      endDate: "December 15, 2025",
      assignments: 0,
      quizzes: 0,
      cloCount: 13
    },
    {
      id: 6,
      code: "NET240",
      title: "Network Security Fundamentals",
      department: "Networking",
      credits: 3,
      enrolledStudents: 45,
      assignedFaculty: [
        { id: 6, name: "Prof. Emily Thompson" }
      ],
      status: "Active",
      startDate: "January 15, 2025",
      endDate: "May 10, 2025",
      assignments: 5,
      quizzes: 3,
      cloCount: 9
    }
  ],
  departments: [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Networking"
  ],
  faculty: [
    { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science" },
    { id: 2, name: "Prof. Michael Chen", department: "Software Engineering" },
    { id: 3, name: "Dr. Robert Garcia", department: "Data Science" },
    { id: 4, name: "Prof. Amanda Lee", department: "Artificial Intelligence" },
    { id: 5, name: "Dr. James Wilson", department: "Computer Science" },
    { id: 6, name: "Prof. Emily Thompson", department: "Networking" }
  ],
  currentUser: {
    name: "Admin User",
    notifications: 3
  }
};



const CourseManagement = () => {
  const [data, setData] = useState(sampleCoursesData);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignFacultyModal, setShowAssignFacultyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Simulate fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch data from your API here
        // const response = await fetch('/api/courses');
        // const jsonData = await response.json();
        // setData(jsonData);
        
        // Using sample data for now
        setData(sampleCoursesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };
    
    // Simulate API delay
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = data.courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'All' || course.department === filterDepartment;
    const matchesStatus = filterStatus === 'All' || course.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleOpenEditModal = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleOpenAssignFacultyModal = (course) => {
    setSelectedCourse(course);
    setShowAssignFacultyModal(true);
  };

  const handleOpenDetailsModal = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setData({
      ...data,
      courses: data.courses.map(course => 
        course.id === id ? {...course, status: newStatus} : course
      )
    });
  };

  const handleAddCourse = (newCourse) => {
    // In a real app, this would be an API call
    const courseWithId = {
      ...newCourse,
      id: data.courses.length + 1,
      assignedFaculty: [],
      assignments: 0,
      quizzes: 0,
      cloCount: 0
    };
    
    setData({
      ...data,
      courses: [...data.courses, courseWithId]
    });
    setShowAddModal(false);
  };

  const handleUpdateCourse = (updatedCourse) => {
    // In a real app, this would be an API call
    setData({
      ...data,
      courses: data.courses.map(course => 
        course.id === updatedCourse.id ? {...course, ...updatedCourse} : course
      )
    });
    setShowEditModal(false);
  };

  const handleAssignFaculty = (courseId, assignedFacultyIds) => {
    // In a real app, this would be an API call
    const assignedFacultyList = data.faculty.filter(faculty => 
      assignedFacultyIds.includes(faculty.id)
    );
    
    setData({
      ...data,
      courses: data.courses.map(course => 
        course.id === courseId ? {...course, assignedFaculty: assignedFacultyList} : course
      )
    });
    setShowAssignFacultyModal(false);
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
              placeholder="Search courses..."
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

      {/* Course Management Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-darktext">Course Management</h1>
          <button 
            onClick={handleOpenAddModal}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Add New Course
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
        
        {/* Course Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead className="bg-blue-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Credits
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                    Faculty
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
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-darktext uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {filteredCourses.map(course => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaBook className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-darktext">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.enrolledStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.assignedFaculty.length > 0 ? (
                        <div className="flex items-center">
                          <span>{course.assignedFaculty.length}</span>
                          <button 
                            onClick={() => handleOpenAssignFacultyModal(course)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleOpenAssignFacultyModal(course)}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <FaPlus className="h-3 w-3 mr-1" />
                          <span>Assign</span>
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.assignments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.quizzes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleOpenDetailsModal(course)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FaSearch />
                        </button>
                        <button 
                          onClick={() => handleOpenEditModal(course)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleStatusToggle(course.id, course.status)}
                          className={`${course.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                          title={course.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {course.status === 'Active' ? <FaBan /> : <FaCheck />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No courses found matching your filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddCourseModal 
          departments={data.departments}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCourse}
        />
      )}

      {showEditModal && selectedCourse && (
        <EditCourseModal 
          course={selectedCourse}
          departments={data.departments}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateCourse}
        />
      )}

      {showAssignFacultyModal && selectedCourse && (
        <AssignFacultyModal 
          course={selectedCourse}
          faculty={data.faculty}
          onClose={() => setShowAssignFacultyModal(false)}
          onSubmit={(facultyIds) => handleAssignFaculty(selectedCourse.id, facultyIds)}
        />
      )}

      {showDetailsModal && selectedCourse && (
        <CourseDetailsModal 
          course={selectedCourse}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </AdminLayout>
  );
}

export default CourseManagement;