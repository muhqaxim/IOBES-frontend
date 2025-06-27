import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import CreateAssessment from "../createAssessment";
import PdfViewerModal from "../pdfViewerModal";
import axios from "axios";

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [facultyId, setFacultyId] = useState(null);
  const [createAssessment, setCreateAssessment] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch quizzes from API based on logged-in faculty
  useEffect(() => {
    const fetchFacultyContent = async () => {
      try {
        setLoading(true);
        const faculty = localStorage.getItem("userId");
        setFacultyId(faculty);

        // Fetch quizzes for the faculty
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/content/faculty/${faculty}`
        );
        const data = res.data;

        // Filter quizzes for the current faculty
        const formatted = data
          .filter((item) => item.type === "QUIZ")
          .map((item, idx) => ({
            id: item.id,
            courseName: item.course?.name || "N/A",
            courseCode: item.course?.code || "N/A",
            creditHours: item.course?.creditHours || "N/A",
            quizNo: idx + 1,
            totalMarks: item.totalMarks || "N/A", // Replace with actual total marks if available
            questions: item.questions,
          }));

        setQuizzes(formatted);
        setFilteredQuizzes(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching faculty quizzes:", err);
      }
    };

    fetchFacultyContent();
  }, []);

  // Filter quizzes based on the search query
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

  const handleCreateAssessment = () => {
    setCreateAssessment(true);
  };

  // Handle quiz deletion
  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/content/${id}`); // Delete quiz from backend
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
      setQuizzes(updatedQuizzes);
      setFilteredQuizzes(updatedQuizzes);
      alert("Quiz deleted successfully!");
    } catch (err) {
      console.error("Error deleting quiz:", err);
      alert("Failed to delete quiz.");
    }
  };

  const openViewModal = (quiz) => {
    setPdfToView(quiz?.questions?.text);
    setSelectedCourseId(null);
    setSelectedCLOs(null);
    setShowPdfViewer(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedQuiz(null);
  };

  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfToView, setPdfToView] = useState(null);

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCLOs, setSelectedCLOs] = useState([]);

  const handleShowAssignment = (pdfData, courseId, cloIds) => {
    setPdfToView(pdfData);
    setSelectedCourseId(courseId);
    setSelectedCLOs(cloIds);
    setShowPdfViewer(true);
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
      {loading ? (
        <div className="w-full flex items-center justify-center h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#141E30]"></div>
        </div>
      ) : (
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
                        onClick={() =>
                          setCreateAssessment({
                            AssessmentType: "Quiz",
                            editMode: true,
                            quizData: quiz,
                          })
                        }
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
      )}
      {createAssessment && (
        <CreateAssessment
          AssessmentType="Quiz"
          onGenerate={handleShowAssignment}
          onClose={() => setCreateAssessment(false)}
        />
      )}

      <PdfViewerModal
        isOpen={showPdfViewer}
        onClose={() => setShowPdfViewer(false)}
        pdfData={pdfToView}
        courseId={selectedCourseId}
        cloIds={selectedCLOs}
        facultyId={facultyId}
        typeOfData={"Quiz"}
      />
    </div>
  );
};

export default QuizManagement;
