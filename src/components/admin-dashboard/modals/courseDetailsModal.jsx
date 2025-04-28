import React from 'react';
import { FaUser, FaBook, FaBuildingColumns, FaGraduationCap, FaListCheck } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
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
          <h3 className="text-lg font-semibold text-primary mb-2">{course.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaBook className="mr-2 text-primary" />
              <span className="font-medium mr-2">Code:</span>
              <span>{course.code}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaBuildingColumns className="mr-2 text-primary" />
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
            <FaBook className="mr-2 text-primary" />
            Description
          </h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {course.description || 'No description available.'}
          </p>
        </div>
        
        {/* Faculty Section */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-darktext mb-3 flex items-center">
            <FaGraduationCap className="mr-2 text-primary" />
            Assigned Faculty
          </h4>
          {course.facultyAssignments && course.facultyAssignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.facultyAssignments.map(assignment => (
                <div key={assignment.id} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUser className="h-5 w-5 text-primary" />
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
            <FaListCheck className="mr-2 text-primary" />
            Course Learning Outcomes (CLOs)
          </h4>
          {course.clos && course.clos.length > 0 ? (
            <div className="space-y-2">
              {course.clos.map((clo) => (
                <div key={clo.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-1">
                    <span className="bg-blue-100 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">
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
            <FaBook className="mr-2 text-primary" />
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
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;