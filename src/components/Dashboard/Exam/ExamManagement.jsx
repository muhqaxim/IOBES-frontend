import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const ExamManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [midtermMarks, setMidtermMarks] = useState("");
  const [finalMarks, setFinalMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("examData")) || [];
    setData(storedData);
  }, []);

  // Save data to localStorage whenever the data changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("examData", JSON.stringify(data));
    }
  }, [data]);

  const calculateTotalMarks = (midterm, final, internal) => {
    return (
      parseFloat(midterm || 0) +
      parseFloat(final || 0) +
      parseFloat(internal || 0)
    );
  };

  const handleAddExam = () => {
    if (
      courseName &&
      courseCode &&
      midtermMarks &&
      finalMarks &&
      internalMarks
    ) {
      const totalMarks = calculateTotalMarks(
        midtermMarks,
        finalMarks,
        internalMarks
      );
      const newExam = {
        id: Date.now(),
        courseName,
        courseCode,
        midtermMarks,
        finalMarks,
        internalMarks,
        totalMarks,
      };
      setData((prevData) => [...prevData, newExam]);
      resetForm();
      setShowModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEdit = (id) => {
    const examToEdit = data.find((exam) => exam.id === id);
    if (examToEdit) {
      setCourseName(examToEdit.courseName);
      setCourseCode(examToEdit.courseCode);
      setMidtermMarks(examToEdit.midtermMarks);
      setFinalMarks(examToEdit.finalMarks);
      setInternalMarks(examToEdit.internalMarks);
      setEditId(id);
      setShowModal(true);
    }
  };

  const handleUpdateExam = () => {
    if (
      courseName &&
      courseCode &&
      midtermMarks &&
      finalMarks &&
      internalMarks
    ) {
      const totalMarks = calculateTotalMarks(
        midtermMarks,
        finalMarks,
        internalMarks
      );
      const updatedData = data.map((exam) =>
        exam.id === editId
          ? {
            ...exam,
            courseName,
            courseCode,
            midtermMarks,
            finalMarks,
            internalMarks,
            totalMarks,
          }
          : exam
      );
      setData(updatedData);
      resetForm();
      setShowModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      const updatedData = data.filter((exam) => exam.id !== id);
      setData(updatedData);
    }
  };

  const handleView = (id) => {
    const exam = data.find((exam) => exam.id === id);
    if (exam) {
      navigate(
        `/dashboard/exam-questions/${id}/${encodeURIComponent(exam.courseName)}`
      );
    }
  };
  const resetForm = () => {
    setCourseName("");
    setCourseCode("");
    setMidtermMarks("");
    setFinalMarks("");
    setInternalMarks("");
    setEditId(null);
  };

  // Search by both course name and course code
  const filteredData = data.filter(
    (exam) =>
      exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] font-inter text-white py-4 px-6 shadow-md flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Exam Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">

          {/* searchbar  */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-10 border border-gray-300 w-full text-black focus:outline-none focus:border-[#27569E]"
              placeholder="Search Exams..."
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* button  */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] hover:bg-gradient-to-tr hover:to-[#27569E] hover:from-[#4A90E2] text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-300"
          >
            Create Exam
          </button>
        </div>
      </header>

      {/* Exam Table */}
      <div className="mt-6 overflow-x-auto bg-white shadow-md">
        <table className="w-full border-blue-300 border ">
          <thead>
            <tr className=" bg-blue-100 text-[#27569E]">
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2   border-r-2">
                Course Name
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Course Code
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Midterm Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Final Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Internal Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2 text-nowrap">
                Total Marks
              </th>
              <th className="py-2 px-6 font-medium border border-blue-300 border-b-2 border-r-2">
                Actions
              </th>
            </tr>
          </thead>

          {/* table data  */}
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50 border border-blue-300 transition-all"
                >
                  <td className="px-6 border-r-2 border-blue-300 text-nowrap">
                    {item.courseName}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.courseCode}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.midtermMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.finalMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.internalMarks}
                  </td>
                  <td className="px-6 border-r-2 border-blue-300">
                    {item.totalMarks}
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-6 border-blue-300">
                    <AiFillEye
                      className="text-green-500 size-5 cursor-pointer hover:text-green-700"
                      onClick={() => handleView(item.id)}
                    />
                    <AiFillEdit
                      className="text-blue-500 size-5 cursor-pointer hover:text-blue-700"
                      onClick={() => handleEdit(item.id)}
                    />
                    <AiFillDelete
                      className="text-red-500 size-5 cursor-pointer hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No exams available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*Popup Modal for Create/Edit Exam */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg shadow-md border-4 border-[#27569E]"> 

            {/* Header with Background */}
            <div className="px-4 py-3 bg-[#27569E] text-white">
              <h2 className="text-2xl font-bold flex justify-center">
                {editId ? "Edit Exam" : "Create Exam"}
              </h2>
            </div>

            {/* Form Fields */}
            <div className="px-4 py-3">
              <div className="flex flex-col gap-3">
                {[
                  { name: "courseName", label: "Course Name", value: courseName, setter: setCourseName },
                  { name: "courseCode", label: "Course Code", value: courseCode, setter: setCourseCode },
                  { name: "midtermMarks", label: "Midterm Marks", value: midtermMarks, setter: setMidtermMarks, type: "number" },
                  { name: "finalMarks", label: "Final Marks", value: finalMarks, setter: setFinalMarks, type: "number" },
                  { name: "internalMarks", label: "Internal Marks", value: internalMarks, setter: setInternalMarks, type: "number" },
                ].map(({ name, label, value, setter, type = "text" }, index) => (
                  <div key={index} className="flex flex-col">
                    <label htmlFor={name} className="text-gray-700 font-medium mb-1">
                      {label}
                    </label>
                    <input
                      id={name}
                      type={type}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={label}
                      className="p-2 border border-gray-300 focus:ring-2 focus:ring-[#27569E] outline-none shadow-sm transition duration-300 w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="px-4 py-3 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={editId ? handleUpdateExam : handleAddExam}
                className="bg-[#27569E] text-white px-4 py-2 hover:bg-blue-900 transition"
              >
                {editId ? "Update" : "Create"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManagement;
