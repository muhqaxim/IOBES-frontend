import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { FaUser, FaBook, FaBuildingColumns  , FaGraduationCap, FaListCheck } from "react-icons/fa6";
import { FaSearch,FaTimes } from "react-icons/fa";
const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch courses from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/course/faculty-courses`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  // View course details
  const handleViewCourseDetails = async (courseId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/course/${courseId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const courseData = await response.json();
      setSelectedCourse(courseData.course);
      setShowDetailsModal(true);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching course details:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedCourse(null);
  };

  // Search by both course name and course code
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !courses.length) return <div className="flex justify-center items-center h-64">Loading courses...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#141E30] to-[#243B55] font-inter text-white py-4 px-6 shadow-md flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Course Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* searchbar */}
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

      {/* Course Table */}
      <div className="mt-6 overflow-x-auto bg-white shadow-md">
        <table className="w-full border-blue-300 border">
          <thead>
            <tr className="bg-blue-100 text-[#141E30]">
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Course Name
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Course Code
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Description
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Action
              </th>
            </tr>
          </thead>

          {/* table data */}
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr
                  key={course._id}
                  className="hover:bg-blue-50 border border-blue-300 transition-all"
                >
                  <td className="px-6 py-3 border-r-2 border-blue-300">
                    {course.name}
                  </td>
                  <td className="px-6 py-3 border-r-2 border-blue-300">
                    {course.code}
                  </td>
                  <td className="px-6 py-3 border-r-2 border-blue-300">
                    {course.description ? (
                      course.description.length > 50 
                        ? `${course.description.substring(0, 50)}...` 
                        : course.description
                    ) : (
                      "No description available"
                    )}
                  </td>
                  <td className="py-3 px-6 border-blue-300">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleViewCourseDetails(course._id)}
                        className="flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full transition-colors"
                        title="View Course Details"
                      >
                        <AiFillEye className="size-5" />
                      </button>
                    </div>
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

// CourseDetailsModal component integrated within the same file
const CourseDetailsModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2">
          <h2 className="text-xl font-semibold text-darktext">Course Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Course Overview */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-[#141E30] mb-2">{course.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaBook className="mr-2 text-[#141E30]" />
              <span className="font-medium mr-2">Code:</span>
              <span>{course.code}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaBuildingColumns className="mr-2 text-[#141E30]" />
              <span className="font-medium mr-2">Department:</span>
              <span>{course.department?.name || 'Not assigned'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="font-medium mr-2">Created:</span>
              <span>{new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="font-medium mr-2">Last Updated:</span>
              <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-darktext mb-2 flex items-center">
            <FaBook className="mr-2 text-[#141E30]" />
            Description
          </h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {course.description || 'No description available.'}
          </p>
        </div>
        
        {/* Faculty Section */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-darktext mb-3 flex items-center">
            <FaGraduationCap className="mr-2 text-[#141E30]" />
            Assigned Faculty
          </h4>
          {course.facultyAssignments && course.facultyAssignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.facultyAssignments.map(assignment => (
                <div key={assignment.id} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUser className="h-5 w-5 text-[#141E30]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-darktext">{assignment.faculty.name}</p>
                    <p className="text-xs text-gray-500">{assignment.faculty.email}</p>
                    <p className="text-xs text-gray-400">Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">No faculty members assigned yet.</p>
          )}
        </div>
        
        {/* CLOs Section */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-darktext mb-3 flex items-center">
            <FaListCheck className="mr-2 text-[#141E30]" />
            Course Learning Outcomes (CLOs)
          </h4>
          {course.clos && course.clos.length > 0 ? (
            <div className="space-y-2">
              {course.clos.map((clo) => (
                <div key={clo.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-1">
                    <span className="bg-blue-100 text-[#141E30] text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">
                      CLO {clo.number}
                    </span>
                    <span className="text-xs text-gray-500">
                      Last updated: {new Date(clo.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-darktext">{clo.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">No CLOs defined yet.</p>
          )}
        </div>
        
        {/* Course Content Summary */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-darktext mb-3 flex items-center">
            <FaBook className="mr-2 text-[#141E30]" />
            Course Content
          </h4>
          {course.contents && course.contents.length > 0 ? (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-darktext">
                    {course.contents.filter(content => content.type === 'QUIZ').length}
                  </p>
                  <p className="text-xs text-gray-500">Quizzes</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-darktext">
                    {course.contents.filter(content => content.type === 'ASSIGNMENT').length}
                  </p>
                  <p className="text-xs text-gray-500">Assignments</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-darktext">
                    {course.contents.filter(content => content.type === 'EXAM').length}
                  </p>
                  <p className="text-xs text-gray-500">Exams</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">No content created yet.</p>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-[#141E30] rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;