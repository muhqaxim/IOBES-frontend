import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const CreateExam = () => {
  const { examName } = useParams();
  const storageKey = `questions-${examName}`; // Unique key for each exam

  // Load questions from localStorage
  const [questions, setQuestions] = useState(() => {
    const storedQuestions = localStorage.getItem(storageKey);
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  });

  const [examType, setExamType] = useState("midterm");
  const [questionType, setQuestionType] = useState("objective");
  const [questionText, setQuestionText] = useState("");
  const [clo, setClo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Update localStorage whenever questions change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(questions));
  }, [questions, storageKey]);

  const handleOpenModal = (question = null) => {
    if (question) {
      setCurrentQuestion(question);
      setExamType(question.examType);
      setQuestionType(question.questionType);
      setQuestionText(question.text);
      setClo(question.clo);
      setIsEditing(true);
    } else {
      setCurrentQuestion(null);
      setExamType("midterm");
      setQuestionType("objective");
      setQuestionText("");
      setClo("");
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveQuestion = () => {
    if (!questionText.trim() || !clo.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === currentQuestion.id
            ? { ...q, text: questionText, clo, examType, questionType }
            : q
        )
      );
    } else {
      const newQuestion = {
        id: Date.now(),
        examType,
        questionType,
        text: questionText,
        clo,
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }

    handleCloseModal();
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem(storageKey, JSON.stringify(updatedQuestions)); // Ensure localStorage updates
  };

  const renderTable = (filteredQuestions, type) => (
    <div className="mb-8 font-inter">
      <h2 className="text-lg font-semibold mb-4 capitalize">{type} Questions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow">
          <thead>
            <tr className="bg-blue-100 text-[#27569E] text-left">
              <th className="p-3 border border-gray-400 w-[70%]">Question</th>
              <th className="p-3 border border-gray-400 w-1/5">Type</th>
              <th className="p-3 border border-gray-400 w-1/5">CLO</th>
              <th className="p-3 border border-gray-400 text-center w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-blue-50">
                  <td className="p-3 border border-gray-400">{q.text}</td>
                  <td className="p-3 border border-gray-400">{q.questionType}</td>
                  <td className="p-3 border border-gray-400">{q.clo}</td>
                  <td className="p-3 border border-gray-400 text-center">
                    <button
                      onClick={() => handleOpenModal(q)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500 text-center">
                  No questions added yet for {type}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-inter">
      <header className="  bg-gradient-to-tr from-[#27569E] to-[#4A90E2] text-white py-4 px-6 shadow-lg flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {examName ? decodeURIComponent(examName) : "Create Exam"}
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] hover:bg-gradient-to-tr hover:to-[#27569E] hover:from-[#4A90E2] text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-300"
        >
          Create Exam
        </button>
      </header>

      {renderTable(questions.filter((q) => q.examType === "midterm"), "midterm")}
      {renderTable(questions.filter((q) => q.examType === "final"), "final")}

      {/* popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white shadow-2xl w-[40%] border-4 border-[#27569E] overflow-hidden">
            <h2 className="text-2xl font-bold text-white bg-[#27569E] px-6 py-4 text-center">
              {isEditing ? "Edit Question" : "Create Question"}
            </h2>

            <div className="p-6 space-y-3">
              <label className="block text-[#27569E] font-semibold mb-1">Exam Type:</label>
              <select value={examType} onChange={(e) => setExamType(e.target.value)}
                className="w-full p-3 border border-blue-300 outline-none">
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
              </select>

              <label className="block text-[#27569E] font-semibold mb-1">Question Type:</label>
              <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}
                className="w-full p-3 border border-blue-300 outline-none">
                <option value="objective">Objective</option>
                <option value="subjective">Subjective</option>
              </select>

              <label className="block text-[#27569E] font-semibold mb-1">CLO:</label>
              <select value={clo} onChange={(e) => setClo(e.target.value)}
                className="w-full p-3 border border-blue-300 outline-none">
                <option value="">Select CLO</option>
                <option value="CLO1">CLO1</option>
                <option value="CLO2">CLO2</option>
                <option value="CLO3">CLO3</option>
              </select>

              <label className="block text-[#27569E] font-semibold mb-1">Question Text:</label>
              <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)}
                className="w-full p-3 border border-blue-300 outline-none resize-none" rows="2" />

              <div className="flex justify-end space-x-3 mt-4">
                <button onClick={handleCloseModal} className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 transition-all">Cancel</button>
                <button onClick={handleSaveQuestion} className="bg-[#27569E] hover:bg-blue-900 text-white px-6 py-2 transition-all">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
