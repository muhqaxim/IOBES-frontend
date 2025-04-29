import React, { useState } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const AddCourseModal = ({ departments, faculty, onClose, onSubmit }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    departmentId: '',
    facultyId: '',
    status: 'Active',
    clos: []
  });
  
  const [errors, setErrors] = useState({});
  const [newClo, setNewClo] = useState({ description: '', number: 1 });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleCloChange = (e) => {
    const { name, value } = e.target;
    setNewClo({
      ...newClo,
      [name]: name === 'number' ? parseInt(value) : value
    });
  };

  const addClo = () => {
    if (!newClo.description.trim()) {
      setErrors({...errors, newClo: 'CLO description is required'});
      return;
    }

    setFormData({
      ...formData,
      clos: [...formData.clos, {...newClo}]
    });
    
    // Reset the new CLO form and clear any errors
    setNewClo({ description: '', number: formData.clos.length + 1 });
    setErrors({...errors, newClo: null});
  };

  const removeClo = (index) => {
    const updatedClos = [...formData.clos];
    updatedClos.splice(index, 1);
    
    // Renumber CLOs after removal
    const renumberedClos = updatedClos.map((clo, idx) => ({
      ...clo,
      number: idx + 1
    }));
    
    setFormData({
      ...formData,
      clos: renumberedClos
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }
    
    if (!formData.departmentId) {
      newErrors.departmentId = 'Department is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: formData.name,
        code: formData.code,
        description: formData.description,
        departmentId: formData.departmentId,
        facultyId: formData.facultyId,
        status: formData.status,
        clos: formData.clos
      });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darktext">Add New Course</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${errors.departmentId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculty
              </label>
              <select
                name="facultyId"
                value={formData.facultyId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Faculty (Optional)</option>
                {faculty && faculty.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter course description"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          {/* CLOs Section */}
          <div className="mb-4 mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-darktext">Course Learning Outcomes (CLOs)</h3>
              <span className="text-xs text-gray-500">Total: {formData.clos.length}</span>
            </div>
            
            {/* Add new CLO section */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CLO Description
                  </label>
                  <textarea
                    name="description"
                    value={newClo.description}
                    onChange={handleCloChange}
                    rows="2"
                    className={`w-full p-2 border rounded-lg ${errors.newClo ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter CLO description"
                  />
                  {errors.newClo && <p className="text-red-500 text-xs mt-1">{errors.newClo}</p>}
                </div>
                <div className="w-20">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={newClo.number}
                    onChange={handleCloChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>
                <button
                  type="button"
                  onClick={addClo}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center justify-center h-10 w-10"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            
            {/* List of added CLOs */}
            {formData.clos.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formData.clos.map((clo, index) => (
                  <div key={index} className="flex items-center justify-between bg-white border rounded-lg p-3">
                    <div>
                      <span className="font-medium text-sm">CLO {clo.number}: </span>
                      <span className="text-sm">{clo.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeClo(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic text-center py-4">No CLOs added yet</p>
            )}
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;