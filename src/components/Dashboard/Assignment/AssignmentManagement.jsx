import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AssignmentManagement = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [assignmentForm, setAssignmentForm] = useState({
        courseName: "",
        courseCode: "",
        creditHours: "",
        assignmentNo: "",
        marks: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // ✅ Load assignments from localStorage on first render
    useEffect(() => {
        const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
        setAssignments(savedAssignments);
    }, []);

    // ✅ Update localStorage whenever assignments change
    useEffect(() => {
        if (assignments.length > 0) {
            localStorage.setItem("assignments", JSON.stringify(assignments));
        }
    }, [assignments]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentForm((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    };

    const openPopup = (isEdit = false, assignment = null) => {
        if (isEdit && assignment) {
            setIsEditing(true);
            setEditId(assignment.id);
            setAssignmentForm(assignment);
        } else {
            setIsEditing(false);
            setEditId(null);
            setAssignmentForm({
                courseName: "",
                courseCode: "",
                creditHours: "",
                assignmentNo: "",
            });
        }
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setAssignmentForm({
            courseName: "",
            courseCode: "",
            creditHours: "",
            assignmentNo: "",
        });
    };

    const handleSaveAssignment = () => {
        if (
            !assignmentForm.courseName ||
            !assignmentForm.courseCode ||
            !assignmentForm.creditHours ||
            !assignmentForm.assignmentNo
        ) {
            alert("Please fill out all fields.");
            return;
        }

        if (isEditing) {
            setAssignments(
                assignments.map((assignment) =>
                    assignment.id === editId ? { ...assignment, ...assignmentForm } : assignment
                )
            );
        } else {
            const newAssignment = { ...assignmentForm, id: Date.now() };
            setAssignments([...assignments, newAssignment]);
        }

        closePopup();
    };

    const handleDeleteAssignment = (id) => {
        const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
        setAssignments(updatedAssignments);
    };

    return (
        <div className="min-h-screen font-inter ">
            <header className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] text-white py-4 px-6 shadow-lg flex justify-between items-center ">
                <h1 className="text-2xl font-semibold">Assignment Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search assignments..."
                            className="py-2 px-3 border  border-gray-300 text-black shadow-md focus:outline-none pl-10"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <button
                        onClick={() => openPopup()}
                        className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] hover:bg-gradient-to-tr hover:to-[#27569E] hover:from-[#4A90E2] text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-300"
                    >
                        Create Assignment
                    </button>
                </div>
            </header>

            <div className="overflow-x-auto shadow-lg border border-blue-300 mt-6 bg-white ">
                <table className="min-w-full text-center">
                    <thead>
                        <tr className="bg-blue-100 text-[#27569E]">
                            {["Course Name", "Course Code", "Credit Hours", "Assignment No", "Marks", "Actions"].map((title, index) => (
                                <th key={index} className="py-2 px-6 font-medium border border-blue-300">{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 ? (
                            assignments.map((assignment) => (
                                <tr key={assignment.id} className="hover:bg-blue-50 transition-all border border-blue-300">
                                    {["courseName", "courseCode", "creditHours", "assignmentNo", "marks"].map((field, index) => (
                                        <td key={index} className="px-6 border border-blue-300">{assignment[field]}</td>
                                    ))}
                                    <td className="py-3 px-6 flex justify-center gap-4">
                                        <AiFillEye
                                            onClick={() => navigate(`/dashboard/assignment-questions/${assignment.courseName}/${assignment.assignmentNo}`)}
                                            className="text-green-600 cursor-pointer hover:text-green-700 transition duration-150 size-4"
                                        />
                                        <FaEdit
                                            onClick={() => openPopup(true, assignment)}
                                            className="text-blue-600 cursor-pointer hover:text-blue-700 transition duration-150 size-4"
                                        />
                                        <FaTrash
                                            onClick={() => handleDeleteAssignment(assignment.id)}
                                            className="text-red-600 cursor-pointer hover:text-red-700 transition duration-150 size-4"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-8 px-6 text-gray-500">No assignments available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white shadow-2xl w-full max-w-lg border-4 border-[#27569E] ">
                        <h2 className="text-2xl font-bold text-white bg-[#27569E] py-4 text-center ">
                            {isEditing ? "Edit Assignment" : "Create Assignment"}
                        </h2>
                        <div className="p-6 space-y-4">
                            {["courseName", "courseCode", "creditHours", "assignmentNo", "marks"].map((name, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{name.replace(/([A-Z])/g, " $1")}</label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={assignmentForm[name]}
                                        onChange={handleInputChange}
                                        placeholder={`Enter ${name}`}
                                        className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#27569E] outline-none shadow-sm"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-4 p-4">
                            <button onClick={closePopup} className="bg-gray-500 text-white px-5 py-2  hover:bg-gray-600">Cancel</button>
                            <button onClick={handleSaveAssignment} className="bg-[#27569E] text-white px-5 py-2  hover:bg-blue-900">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentManagement;
