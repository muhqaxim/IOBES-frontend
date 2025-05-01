import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import {
  FaUser,
  FaBook,
  FaGraduationCap,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import   {FaBuildingColumns} from 'react-icons/fa6';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);
        const facultyId = decoded?.id;
        if (!facultyId) {
          throw new Error("Invalid token or faculty ID not found");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses`
        );
        setCourses(response.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleViewCourseDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !courses.length)
    return <div className="text-center py-20">Loading courses...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#141E30] to-[#243B55] font-inter text-white py-4 px-6 shadow-md flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Course Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-10 border border-gray-300 w-full text-black focus:outline-none focus:border-[#141E30]"
              placeholder="Search Courses..."
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Table */}
      <div className="mt-6 overflow-x-auto bg-white shadow-md">
        <table className="w-full border border-blue-300">
          <thead>
            <tr className="bg-blue-100 text-[#141E30]">
              <th className="py-2 px-6 border border-blue-300">Course Name</th>
              <th className="py-2 px-6 border border-blue-300">Course Code</th>
              <th className="py-2 px-6 border border-blue-300">Description</th>
              <th className="py-2 px-6 border border-blue-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-blue-50 transition-all"
                >
                  <td className="px-6 py-3 border border-blue-300">
                    {course.name}
                  </td>
                  <td className="px-6 py-3 border border-blue-300">
                    {course.code}
                  </td>
                  <td className="px-6 py-3 border border-blue-300">
                    {course.description
                      ? course.description.length > 50
                        ? `${course.description.substring(0, 50)}...`
                        : course.description
                      : "No description available"}
                  </td>
                  <td className="py-3 px-6 border border-blue-300">
                    <button
                      onClick={() => handleViewCourseDetails(course)}
                      className="flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full"
                      title="View Course Details"
                    >
                      <AiFillEye className="size-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const CourseDetailsModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Course Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Basic Details */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="text-sm text-gray-600 flex items-center">
              <FaBook className="mr-2" /> <strong>Code:</strong> {course.code}
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <FaBuildingColumns className="mr-2" />{" "}
              <strong>Department:</strong> {course?.department?.name || "N/A"}
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <strong>Created:</strong>{" "}
              {new Date(course.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <strong>Last Updated:</strong>{" "}
              {new Date(course.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <FaBook className="mr-2 text-[#141E30]" /> Description
          </h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {course.description || "No description available."}
          </p>
        </div>

        {/* Faculty Assignments */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3 flex items-center">
            <FaGraduationCap className="mr-2 text-[#141E30]" /> Assigned Faculty
          </h4>
          {course.facultyAssignments?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.facultyAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-[#141E30]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {assignment.faculty?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {assignment.faculty?.email || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No faculty assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
