import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import CreateAssessment from "../createAssessment";

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [createAssessment, setCreateAssessment] = useState(false);

  // Load quizzes from localStorage on component mount
  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes");
    if (savedQuizzes) {
      const parsedQuizzes = JSON.parse(savedQuizzes);
      setQuizzes(parsedQuizzes);
      setFilteredQuizzes(parsedQuizzes);
    }
  }, []);

  // Filter quizzes whenever the quizzes or searchQuery changes
  useEffect(() => {
    const filtered = quizzes.filter((quiz) =>
      [quiz.courseName, quiz.courseCode, quiz.quizNo]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [quizzes, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteQuiz = (id) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  const openViewModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="min-h-screen font-inter">
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#141E30] to-[#243B55] text-white py-4 px-6 rounded shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-0">Quiz Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search quizzes..."
              className="py-2 px-3 border border-gray-300 rounded text-black shadow-md focus:outline-none pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={() => setCreateAssessment(true)}
            className="bg-gradient-to-tr from-[#141E30] to-[#243B55] hover:bg-gradient-to-tr hover:from-white/90 hover:to-white/80 hover:text-[#141E30] text-white py-2 px-6 rounded shadow-lg border border-white duration-300"
          >
            Create Quiz
          </button>
        </div>
      </header>

      {/* Quiz Table */}
      <div className="overflow-x-auto shadow-lg rounded border border-blue-300 mt-6">
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
                Credit Hours
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Quiz No
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
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="hover:bg-blue-50 border border-blue-300 transition-all"
                >
                  <td className="px-6 border-r-2 border-blue-300">
                    {quiz.courseName}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.courseCode}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.creditHours}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.quizNo}
                  </td>
                  <td className="px-6 border-x-2 border-blue-300">
                    {quiz.totalMarks}
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-6 border-blue-300">
                    <AiFillEye
                      onClick={() => openViewModal(quiz)}
                      className="text-green-600 cursor-pointer hover:text-green-700 transform transition duration-150"
                    />
                    <AiFillEdit
                      onClick={() => CreateAssessment({ 
                        AssessmentType: "Quiz", 
                        editMode: true, 
                        quizData: quiz 
                      })}
                      className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150"
                    />
                    <AiFillDelete
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="text-red-600 cursor-pointer hover:text-red-700 transform transition duration-150"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 px-6 text-gray-500">
                  No quizzes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Quiz Modal */}
      {isViewModalOpen && selectedQuiz && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-2xl w-full max-w-lg border-4 border-blue-800">
            <div className="bg-blue-800 text-white text-center py-3 shadow-md">
              <h2 className="text-xl font-bold tracking-wide">
                Quiz Details
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-medium text-gray-700">Course Name:</div>
                <div>{selectedQuiz.courseName}</div>
                
                <div className="font-medium text-gray-700">Course Code:</div>
                <div>{selectedQuiz.courseCode}</div>
                
                <div className="font-medium text-gray-700">Credit Hours:</div>
                <div>{selectedQuiz.creditHours}</div>
                
                <div className="font-medium text-gray-700">Quiz No:</div>
                <div>{selectedQuiz.quizNo}</div>
                
                <div className="font-medium text-gray-700">Total Marks:</div>
                <div>{selectedQuiz.totalMarks}</div>
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
      {createAssessment && <CreateAssessment AssessmentType="Quiz" onClose={() => setCreateAssessment(false)} />}
    </div>
  );
};

export default QuizManagement;