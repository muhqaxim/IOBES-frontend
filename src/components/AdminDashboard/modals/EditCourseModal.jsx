import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';

const EditCourseModal = ({ course, departments, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: course.id,
    code: course.code,
    title: course.title,
    department: course.department,
    credits: course.credits,
    enrolledStudents: course.enrolledStudents,
    status: course.status,
    startDate: course.startDate,
    endDate: course.endDate
  });

  // Format dates if they come in as strings
  useEffect(() => {
    if (typeof course.startDate === 'string' && !course.startDate.includes('-')) {
      // Convert string dates to date input format (YYYY-MM-DD) if needed
      const formatDate = (dateStr) => {
        try {
          const date = new Date(dateStr);
          return date.toISOString().split('T')[0];
        } catch {
          return '';
        }
      };
      
      setFormData(prev => ({
        ...prev,
        startDate: formatDate(course.startDate),
        endDate: formatDate(course.endDate)
      }));
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darktext flex items-center">
            <FaEdit className="mr-2 text-primary" />
            Edit Course
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
              <input 
                type="text" 
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                required
                placeholder="e.g. CS101"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                required
              >
                {departments.map((department, index) => (
                  <option key={index} value={department}>{department}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" 
              required
              placeholder="e.g. Introduction to Computer Science"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
              <input 
                type="number" 
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                required
                min="1"
                max="6"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Enrollment</label>
              <input 
                type="number" 
                name="enrolledStudents"
                value={formData.enrolledStudents}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                min="0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10" 
                  required
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10" 
                  required
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="status" 
                  value="Active" 
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary" 
                />
                <span className="ml-2 text-sm">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="status" 
                  value="Inactive" 
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary" 
                />
                <span className="ml-2 text-sm">Inactive</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <button 
              type="button" 
              onClick={onClose}
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
  );
};

export default EditCourseModal;