import { useState, useEffect } from "react";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import CreateAssessment from "../createAssessment";
import PdfViewerModal from "../pdfViewerModal";
import axios from "axios"; // Ensure axios is imported for API calls

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [createAssessment, setCreateAssessment] = useState(false);
  const [facultyId, setFacultyId] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch exams for the logged-in faculty from the API
  useEffect(() => {
    const fetchFacultyExams = async () => {
      try {
        setLoading(true);
        const faculty = localStorage.getItem("userId");
        setFacultyId(faculty);

        // Fetch exams for the faculty from the backend
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/content/faculty/${faculty}`
        );
        const data = res.data;

        // Filter exams for the current faculty
        const formatted = data
          .filter((item) => item.type === "EXAM")
          .map((item, idx) => ({
            id: item.id,
            courseName: item.course?.name || "N/A",
            courseCode: item.course?.code || "N/A",
            creditHours: item.course?.creditHours || "N/A",
            examNo: idx + 1,
            midtermMarks: item.midtermMarks || "N/A",
            finalMarks: item.finalMarks || "N/A",
            internalMarks: item.internalMarks || "N/A",
            totalMarks: item.totalMarks || "N/A",
            questions: item.questions,
          }));

        setExams(formatted);
        setFilteredExams(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching faculty exams:", err);
      }
    };

    fetchFacultyExams();
  }, []);

  // Filter exams based on search query
  useEffect(() => {
    const filtered = exams.filter((exam) =>
      [exam.courseName, exam.courseCode, exam.examNo]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredExams(filtered);
  }, [exams, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateAssessment = () => {
    setCreateAssessment(true);
  };

  // Handle delete exam
  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/content/${id}`); // Delete exam from backend
      const updatedExams = exams.filter((exam) => exam.id !== id);
      setExams(updatedExams);
      setFilteredExams(updatedExams);
      alert("Exam deleted successfully!");
    } catch (err) {
      console.error("Error deleting exam:", err);
      alert("Failed to delete exam.");
    }
  };

  const openViewModal = (exam) => {
    setPdfToView(exam?.questions?.text);
    setSelectedCourseId(null);
    setSelectedCLOs(null);
    setShowPdfViewer(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedExam(null);
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
      {loading ? (
        <div className="w-full flex items-center justify-center h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#141E30]"></div>
        </div>
      ) : (
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
                        onClick={() =>
                          setCreateAssessment({
                            AssessmentType: "Exam",
                            editMode: true,
                            examData: exam,
                          })
                        }
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
                  <td
                    colSpan="7"
                    className="py-8 px-6 text-gray-500 text-center"
                  >
                    No exams available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {createAssessment && (
        <CreateAssessment
          AssessmentType="Exam"
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
        typeOfData="Exam"
      />
    </div>
  );
};

export default ExamManagement;
