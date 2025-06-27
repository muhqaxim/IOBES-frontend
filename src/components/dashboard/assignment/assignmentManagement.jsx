import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import CreateAssessment from "../createAssessment";
import PdfViewerModal from "../pdfViewerModal";
import axios from "axios";
const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [facultyId, setFacultyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createAssessment, setCreateAssessment] = useState(false);

  useEffect(() => {
    const fetchFacultyContent = async () => {
      try {
        setLoading(true);
        const faculty = localStorage.getItem("userId");
        // if (!facultyId) return;
        setFacultyId(faculty);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/content/faculty/${faculty}`
        );
        const data = await res.json();

        // Transform content for table display
        const formatted = data
          .filter((item) => item.type === "ASSIGNMENT")
          .map((item, idx) => ({
            id: item.id,
            courseName: item.course?.name || "N/A",
            courseCode: item.course?.code || "N/A",
            creditHours: item.course?.creditHours || "N/A",
            assignmentNo: idx + 1,
            marks: "N/A", // You can replace this with actual marks if available
            questions: item.questions,
          }));

        setAssignments(formatted);
        setFilteredAssignments(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching faculty content:", err);
      }
    };

    fetchFacultyContent();
  }, []);

  // Filter assignments whenever the assignments or searchQuery changes
  useEffect(() => {
    const filtered = assignments.filter((assignment) =>
      [assignment.courseName, assignment.courseCode, assignment.assignmentNo]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredAssignments(filtered);
  }, [assignments, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCreateAssessment = () => {
    setCreateAssessment(true);
  };
  const handleDeleteAssignment = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/content/${id}`); // Delete on the backend
      const updatedAssignments = assignments.filter(
        (assignment) => assignment.id !== id
      );
      setAssignments(updatedAssignments);
      setFilteredAssignments(updatedAssignments);
      alert("Assignment deleted successfully!");
    } catch (err) {
      console.error("Error deleting assignment:", err);
      alert("Failed to delete assignment.");
    }
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

  const openViewModal = (assignment) => {
    setPdfToView(assignment?.questions?.text);
    setSelectedCourseId(null);
    setSelectedCLOs(null);
    setShowPdfViewer(true);
  };
  return (
    <div className="min-h-screen font-inter">
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#141E30] to-[#243B55] text-white py-4 px-6 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-0">Assignment Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search assignments..."
              className="py-2 px-3 border border-gray-300 rounded text-black shadow-md focus:outline-none pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={handleCreateAssessment}
            className="bg-gradient-to-tr from-[#141E30] to-[#243B55] hover:bg-gradient-to-tr hover:from-white/90 hover:to-white/80 hover:text-[#141E30] text-white py-2 px-6 rounded shadow-lg border border-white duration-300"
          >
            Create Assignment
          </button>
        </div>
      </header>

      {/* Assignment Table */}
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
                  Assignment No
                </th>
                <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                  Marks
                </th>
                <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="hover:bg-blue-50 border border-blue-300 transition-all"
                  >
                    <td className="px-6 border-r-2 border-blue-300">
                      {assignment.courseName}
                    </td>
                    <td className="px-6 border-r-2 border-blue-300">
                      {assignment.courseCode}
                    </td>
                    <td className="px-6 border-r-2 border-blue-300">
                      {assignment.creditHours}
                    </td>
                    <td className="px-6 border-r-2 border-blue-300">
                      {assignment.assignmentNo}
                    </td>
                    <td className="px-6 border-r-2 border-blue-300">
                      {assignment.marks}
                    </td>
                    <td className="py-3 px-6 flex justify-center gap-4 border-blue-300">
                      <AiFillEye
                        onClick={() => openViewModal(assignment)}
                        className="text-green-600 cursor-pointer hover:text-green-700 transform transition duration-150"
                      />
                      <FaEdit
                        onClick={() => handleEditAssignment(assignment.id)}
                        className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150"
                      />
                      <FaTrash
                        onClick={() => handleDeleteAssignment(assignment.id)}
                        className="text-red-600 cursor-pointer hover:text-red-700 transform transition duration-150"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 px-6 text-gray-500">
                    No assignments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {createAssessment && (
        <CreateAssessment
          AssessmentType={"Assignment"}
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
        typeOfData={"Assignment"}
      />
    </div>
  );
};

export default AssignmentManagement;
