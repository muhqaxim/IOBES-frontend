import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserPlus, FaSearch, FaFilter } from 'react-icons/fa';

const AssignFacultyModal = ({ course, faculty, onSubmit, onClose }) => {
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  
  // Initialize selected faculty from course
  useEffect(() => {
    if (course && course.assignedFaculty) {
      setSelectedFacultyIds(course.assignedFaculty.map(f => f.id));
    }
  }, [course]);

  // Get unique departments from faculty list
  const departments = ['All', ...new Set(faculty.map(f => f.department))];

  // Filter faculty based on search term and department filter
  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (f.department && f.department.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = filterDepartment === 'All' || f.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleToggleFaculty = (facultyId) => {
    setSelectedFacultyIds(prev => {
      if (prev.includes(facultyId)) {
        return prev.filter(id => id !== facultyId);
      } else {
        return [...prev, facultyId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedFacultyIds);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darktext flex items-center">
            <FaUsers className="mr-2 text-primary" />
            Assign Faculty to {course.code}: {course.title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        {/* Search and filter */}
        <div className="mb-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Selected faculty count */}
        <div className="mb-4 bg-blue-50 rounded-lg p-3 flex items-center">
          <FaUserPlus className="text-primary mr-2" />
          <span className="text-sm">
            {selectedFacultyIds.length} {selectedFacultyIds.length === 1 ? 'faculty member' : 'faculty members'} assigned to this course
          </span>
        </div>
        
        {/* Faculty list */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-lg mb-4">
            {filteredFaculty.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredFaculty.map(f => (
                  <li key={f.id} className="p-3 hover:bg-gray-50">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFacultyIds.includes(f.id)}
                        onChange={() => handleToggleFaculty(f.id)}
                        className="h-4 w-4 text-primary rounded"
                      />
                      <div className="ml-3 flex-grow">
                        <p className="text-sm font-medium text-gray-900">{f.name}</p>
                        <p className="text-sm text-gray-500">{f.department}</p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No faculty found matching your search criteria.
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
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
              Save Assignments
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignFacultyModal;