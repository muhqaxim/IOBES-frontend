import React from 'react';
import { 
  FaBook, FaChalkboardTeacher, FaCalendarAlt, FaUserGraduate, 
  FaClipboardList, FaClipboardCheck, FaRegListAlt, FaUsers
} from 'react-icons/fa';

const CourseDetailsModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darktext flex items-center">
            <FaBook className="mr-2 text-primary" />
            Course Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-primary mb-1">{course.title}</h3>
          <p className="text-sm text-gray-600">Course Code: {course.code}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaRegListAlt className="mr-2 text-primary" />
                General Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Department:</span>
                  <span className="text-sm font-medium">{course.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Credits:</span>
                  <span className="text-sm font-medium">{course.credits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaCalendarAlt className="mr-2 text-primary" />
                Timeline
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Start Date:</span>
                  <span className="text-sm font-medium">{course.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">End Date:</span>
                  <span className="text-sm font-medium">{course.endDate}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaClipboardList className="mr-2 text-primary" />
                Assessment Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Assignments:</span>
                  <span className="text-sm font-medium">{course.assignments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quizzes:</span>
                  <span className="text-sm font-medium">{course.quizzes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CLOs:</span>
                  <span className="text-sm font-medium">{course.cloCount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaUserGraduate className="mr-2 text-primary" />
                Enrollment
              </h4>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Enrolled Students:</span>
                <span className="text-sm font-medium">{course.enrolledStudents}</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-primary" />
                Faculty
              </h4>
              {course.assignedFaculty.length > 0 ? (
                <ul className="space-y-2">
                  {course.assignedFaculty.map(faculty => (
                    <li key={faculty.id} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <FaUsers className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{faculty.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No faculty assigned yet.</p>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaClipboardCheck className="mr-2 text-primary" />
                Recent Activity
              </h4>
              {course.assignments > 0 || course.quizzes > 0 ? (
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Last Assignment: </span>
                    <span>Midterm Project (4/15/2025)</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Last Quiz: </span>
                    <span>Week 12 Review (4/10/2025)</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;