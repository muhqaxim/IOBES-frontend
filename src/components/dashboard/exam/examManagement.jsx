import { useState, useEffect } from "react";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import CreateAssessment from "../createAssessment";
const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [createAssessment, setCreateAssessment] = useState(false);

  // Load exams from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("examData")) || [];
    setExams(storedData);
    setFilteredExams(storedData);
  }, []);

  // Filter exams whenever the exams or searchQuery changes
  useEffect(() => {
    const filtered = exams.filter(
      (exam) =>
        exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExams(filtered);
  }, [exams, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteExam = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      const updatedExams = exams.filter((exam) => exam.id !== id);
      setExams(updatedExams);
      localStorage.setItem("examData", JSON.stringify(updatedExams));
    }
  };

  const openViewModal = (exam) => {
    setSelectedExam(exam);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedExam(null);
  };

  return (
    <div className="min-h-screen font-inter">
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#141E30] to-[#243B55] text-white py-4 px-6 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-0">Exam Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 pl-10 border border-gray-300 text-black rounded shadow-md focus:outline-none"
              placeholder="Search Exams..."
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={() => setCreateAssessment(true)}
            className="bg-gradient-to-tr from-[#141E30] to-[#243B55] hover:bg-gradient-to-tr hover:from-white/90 hover:to-white/80 hover:text-[#141E30] text-white py-2 px-6 rounded shadow-lg border border-white duration-300"
          >
            Create Exam
          </button>
        </div>
      </header>

      {/* Exam Table */}
      <div className="mt-6 overflow-x-auto shadow-lg rounded border border-blue-300">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Course Name
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Course Code
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Midterm Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Final Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Internal Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Total Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <tr
                  key={exam.id}
                  className="hover:bg-blue-50 border border-blue-300 transition-all"
                >
                  <td className="px-6 border-r-2 border-blue-300">
                    {exam.courseName}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {exam.courseCode}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {exam.midtermMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {exam.finalMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {exam.internalMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {exam.totalMarks}
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-6 border-blue-300">
                    <AiFillEye
                      onClick={() => openViewModal(exam)}
                      className="text-green-600 cursor-pointer hover:text-green-700 transform transition duration-150"
                    />
                    <AiFillEdit
                      onClick={() => CreateAssessment({ 
                        AssessmentType: "Exam", 
                        editMode: true, 
                        examData: exam 
                      })}
                      className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150"
                    />
                    <AiFillDelete
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-600 cursor-pointer hover:text-red-700 transform transition duration-150"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 px-6 text-gray-500 text-center">
                  No exams available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Exam Modal */}
      {isViewModalOpen && selectedExam && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-2xl w-full max-w-lg border-4 border-blue-800">
            <div className="bg-blue-800 text-white text-center py-3 shadow-md">
              <h2 className="text-xl font-bold tracking-wide">
                Exam Details
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-medium text-gray-700">Course Name:</div>
                <div>{selectedExam.courseName}</div>
                
                <div className="font-medium text-gray-700">Course Code:</div>
                <div>{selectedExam.courseCode}</div>
                
                <div className="font-medium text-gray-700">Midterm Marks:</div>
                <div>{selectedExam.midtermMarks}</div>
                
                <div className="font-medium text-gray-700">Final Marks:</div>
                <div>{selectedExam.finalMarks}</div>
                
                <div className="font-medium text-gray-700">Internal Marks:</div>
                <div>{selectedExam.internalMarks}</div>
                
                <div className="font-medium text-gray-700">Total Marks:</div>
                <div>{selectedExam.totalMarks}</div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeViewModal}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 py-2 rounded shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {createAssessment && (
        <CreateAssessment 
          AssessmentType="Exam"
          onClose={() => setCreateAssessment(false)}
        />
      )}
    </div>
  );
};

export default ExamManagement;