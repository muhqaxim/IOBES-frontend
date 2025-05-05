import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaCheck,
  FaBan,
  FaUsers,
  FaPlus,
  FaFilter,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClock,
} from "react-icons/fa";
import AdminLayout from "./adminLayout";
import AddCourseModal from "./modals/addCourseModal";
import EditCourseModal from "./modals/editCourseModal";
import AssignFacultyModal from "./modals/assignFacultyModal";
import CourseDetailsModal from "./modals/courseDetailsModal";
import axios from "axios";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Software Engineering" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Artificial Intelligence" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignFacultyModal, setShowAssignFacultyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentUser, setCurrentUser] = useState({
    name: "Admin User",
    notifications: 2,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch courses
        const coursesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses`
        );

        // Fetch faculty
        const facultyResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/faculty`
        );

        setCourses(coursesResponse.data);
        setFaculty(facultyResponse.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      (course.name &&
        course.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.code &&
        course.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.department &&
        course.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment =
      filterDepartment === "All" || course.department === filterDepartment;
    const matchesStatus =
      filterStatus === "All" || course.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle adding a new course
  const handleAddCourse = async (courseData) => {
    try {
      // Ensure clos is an array, even if empty
      const payload = {
        ...courseData,
        clos: Array.isArray(courseData.clos) ? courseData.clos : [],
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/courses`,
        payload
      );
  
      setCourses([...courses, response.data.course]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding course:", error);
      alert(
        "Failed to add course: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  

  // Handle updating a course
  const handleUpdateCourse = async (courseData) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/courses/${selectedCourse.id}`,
        courseData
      );

      // Update courses list with updated course
      setCourses(
        courses.map((course) =>
          course.id === selectedCourse.id ? response.data.course : course
        )
      );

      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating course:", error);
      alert(
        "Failed to update course: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Handle deleting a course
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/courses/${courseId}`);

      // Remove deleted course from state
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(
        "Failed to delete course: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Handle assigning faculty to a course
  const handleAssignFaculty = async (courseId, facultyIds) => {
    try {
      // Remove all current faculty assignments
      const currentAssignments = selectedCourse.facultyAssignments || [];

      for (const assignment of currentAssignments) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/courses/remove-faculty`,
          {
            courseId: courseId,
            facultyId: assignment.faculty.id,
          }
        );
      }

      // Add new faculty assignments
      for (const facultyId of facultyIds) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/courses/assign-faculty`,
          {
            courseId: courseId,
            facultyId: facultyId,
          }
        );
      }

      // Refresh course data
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`
      );

      setCourses(
        courses.map((course) =>
          course.id === courseId ? response.data : course
        )
      );

      setShowAssignFacultyModal(false);
    } catch (error) {
      console.error("Error assigning faculty:", error);
      alert(
        "Failed to assign faculty: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

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

      {/* Course Management Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-darktext">
            Course Management
          </h1>
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map((department, index) => (
                  <option key={index} value={department.id}>
                    {department.name}
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
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Course Table */}
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#141E30]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Course
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
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Faculty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      CLOs
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider"
                    >
                      Content
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
                  {filteredCourses.map((course) => (
                    <tr onClick={() => handleOpenDetailsModal(course)} key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaBook className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-darktext">
                              {course.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {course.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.department?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {course.description || "No description available"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.createdAt &&
                          new Date(course.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.facultyAssignments &&
                        course.facultyAssignments.length > 0 ? (
                          <div className="flex items-center">
                            <span>{course.facultyAssignments.length}</span>
                            <button
                              onClick={() =>
                                handleOpenAssignFacultyModal(course)
                              }
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
                        {course.clos ? course.clos.length : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.contents ? (
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {
                                course.contents.filter((c) => c.type === "QUIZ")
                                  .length
                              }{" "}
                              Quizzes
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {
                                course.contents.filter(
                                  (c) => c.type === "ASSIGNMENT"
                                ).length
                              }{" "}
                              Assignments
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                              {
                                course.contents.filter((c) => c.type === "EXAM")
                                  .length
                              }{" "}
                              Exams
                            </span>
                          </div>
                        ) : (
                          <span>No content</span>
                        )}
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
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this course?"
                                )
                              ) {
                                handleDeleteCourse(course.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash />
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
                <p className="text-gray-500">
                  No courses found matching your filters.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddCourseModal
          faculty={faculty}
          departments={departments}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCourse}
        />
      )}

      {showEditModal && selectedCourse && (
        <EditCourseModal
          course={{
            ...selectedCourse,
            title: selectedCourse.name, // Map backend name to frontend title
          }}
          departments={departments}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateCourse}
        />
      )}

      {showAssignFacultyModal && selectedCourse && (
        <AssignFacultyModal
          course={selectedCourse}
          faculty={faculty}
          assignedFaculty={
            selectedCourse.facultyAssignments?.map(
              (assignment) => assignment.faculty
            ) || []
          }
          onClose={() => setShowAssignFacultyModal(false)}
          onSubmit={(facultyIds) =>
            handleAssignFaculty(selectedCourse.id, facultyIds)
          }
        />
      )}

      {showDetailsModal && selectedCourse && (
        <CourseDetailsModal
          course={{
            ...selectedCourse,
            title: selectedCourse.name, // Map backend name to frontend title
            assignedFaculty:
              selectedCourse.facultyAssignments?.map(
                (assignment) => assignment.faculty
              ) || [],
          }}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </AdminLayout>
  );
};

export default CourseManagement;
