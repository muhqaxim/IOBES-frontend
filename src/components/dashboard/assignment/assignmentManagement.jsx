import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import CreateAssessment from "../createAssessment";
import PdfViewerModal from "../pdfViewerModal";
const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [createAssessment, setCreateAssessment] = useState(false);

  // Load assignments from localStorage on component mount
  useEffect(() => {
    const savedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(savedAssignments);
    setFilteredAssignments(savedAssignments);
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
  const handleDeleteAssignment = (id) => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== id
    );
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
  };

  const handleEditAssignment = (id) => {};

  const openViewModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedAssignment(null);
  };
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfToView, setPdfToView] = useState(null);
  const handleShowAssignment = (pdfData) => {
    setPdfToView(pdfData);
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
                      onClick={() =>
                        handleEditAssignment(assignment.id)
                      }
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

      {/* View Assignment Modal */}
      {isViewModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-2xl w-full max-w-lg border-4 border-blue-800">
            <div className="bg-blue-800 text-white text-center py-3 shadow-md">
              <h2 className="text-xl font-bold tracking-wide">
                Assignment Details
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-medium text-gray-700">Course Name:</div>
                <div>{selectedAssignment.courseName}</div>

                <div className="font-medium text-gray-700">Course Code:</div>
                <div>{selectedAssignment.courseCode}</div>

                <div className="font-medium text-gray-700">Credit Hours:</div>
                <div>{selectedAssignment.creditHours}</div>

                <div className="font-medium text-gray-700">Assignment No:</div>
                <div>{selectedAssignment.assignmentNo}</div>

                <div className="font-medium text-gray-700">Marks:</div>
                <div>{selectedAssignment.marks || "Not specified"}</div>
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
          AssessmentType={"Assignment"}
          onGenerate={handleShowAssignment}
          onClose={() => setCreateAssessment(false)}
        />
      )}
      <PdfViewerModal
        isOpen={showPdfViewer}
        onClose={() => setShowPdfViewer(false)}
        pdfData={pdfToView}
      />
    </div>
  );
};

export default AssignmentManagement;
