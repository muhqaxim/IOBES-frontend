// AssignFacultyModal.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';

const AssignFacultyModal = ({ course, faculty, assignedFaculty, onClose, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);
  
  // Initialize with current assigned faculty
  useEffect(() => {
    if (assignedFaculty && assignedFaculty.length > 0) {
      setSelectedFacultyIds(assignedFaculty.map(faculty => faculty.id));
    }
  }, [assignedFaculty]);
  
  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleToggleFaculty = (facultyId) => {
    if (selectedFacultyIds.includes(facultyId)) {
      setSelectedFacultyIds(selectedFacultyIds.filter(id => id !== facultyId));
    } else {
      setSelectedFacultyIds([...selectedFacultyIds, facultyId]);
    }
  };
  
  const handleSubmit = () => {
    onSubmit(selectedFacultyIds);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darktext">
            Assign Faculty to {course.name || course.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center rounded-lg bg-gray-100 p-2">
            <FaSearch className="h-5 w-5 text-gray-500" />
            <input
              className="ml-2 bg-transparent outline-none placeholder-gray-500 w-full"
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto mb-4">
          {filteredFaculty.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No faculty members found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFaculty.map(f => (
                <div 
                  key={f.id} 
                  className="flex items-center py-3 px-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleToggleFaculty(f.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedFacultyIds.includes(f.id)}
                    onChange={() => {}}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-darktext">{f.name}</p>
                    <p className="text-xs text-gray-500">{f.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-600">
            {selectedFacultyIds.length} faculty member(s) selected
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700"
            >
              Assign Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignFacultyModal;