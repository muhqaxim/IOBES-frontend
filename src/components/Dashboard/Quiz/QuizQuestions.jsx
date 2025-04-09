import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { useParams } from "react-router-dom";

const QuizQuestions = () => {
  const { courseName, quizNo } = useParams(); // Get dynamic parameters from the URL

  // Retrieve stored questions from localStorage
  const [questions, setQuestions] = useState(() => {
    const storedQuestions = localStorage.getItem("questions");
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  });

  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [cloType, setCloType] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Update localStorage whenever questions change
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleSaveQuestion = () => {
    if (questionText && questionType) {
      if (editingIndex !== null) {
        // Update existing question
        const updatedQuestions = [...questions];
        updatedQuestions[editingIndex] = { questionText, questionType, cloType, courseName, quizNo };
        setQuestions(updatedQuestions);
      } else {
        // Add new question
        const newQuestion = { questionText, questionType, cloType, courseName, quizNo };
        setQuestions([...questions, newQuestion]);
      }

      // Reset modal and state
      setQuestionText("");
      setQuestionType("");
      setCloType("1");
      setEditingIndex(null);
      setIsModalVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditQuestion = (index) => {
    const question = questions[index];
    setQuestionText(question.questionText);
    setQuestionType(question.questionType);
    setCloType(question.cloType);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen font-inter">
      <header className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] text-white py-4 px-6 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{courseName} - Quiz {quizNo}</h1>
        <button
          onClick={() => setIsModalVisible(true)}
          className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] hover:bg-gradient-to-tr hover:to-[#27569E] hover:from-[#4A90E2] text-white py-2 px-6 rounded-sm shadow-lg border border-white duration-300"
        >
          Create Question
        </button>
      </header>

      <div className="overflow-x-auto mt-6 border border-blue-300">
        <table className="table-auto w-full text-sm text-gray-800 bg-white shadow border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100 text-[#27569E] border-b text-center">
              <th className="px-4 py-2 border border-blue-400 w-1/2">Question Text</th>
              <th className="px-4 py-2 border border-blue-400 w-1/6">Question Type</th>
              <th className="px-4 py-2 border border-blue-400 w-1/6">CLO Type</th>
              <th className="px-4 py-2 border border-blue-400 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions
                .filter(q => q.courseName === courseName && q.quizNo === quizNo)
                .map((question, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-blue-50 text-center">
                    <td className="px-4 py-2 border border-gray-300 text-left">{question.questionText}</td>
                    <td className="px-4 py-2 border border-gray-300">{question.questionType}</td>
                    <td className="px-4 py-2 border border-gray-300">{question.cloType}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button onClick={() => handleEditQuestion(index)} className="text-yellow-500 hover:text-yellow-600 mr-2">
                        <AiFillEdit
                          className="text-blue-600 cursor-pointer hover:text-blue-700 transform transition duration-150 size-4"
                        />
                      </button>
                      <button onClick={() => handleDeleteQuestion(index)} className="text-red-500 hover:text-red-600">
                        <AiFillDelete className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 border border-gray-300">
                  No questions added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* popup Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white shadow-xl w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] border-4 border-[#27569E] ">

            {/* Modal Header */}
            <div className="bg-[#27569E] text-white p-4 text-center ">
              <h2 className="text-2xl font-semibold">
                {editingIndex !== null ? "Edit Question" : "Create Question"}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Question Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Question Text</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the question text"
                  className="p-3 text-sm w-full border border-[#27569E]  focus:ring-2 focus:ring-[#27569E] outline-none resize-none"
                ></textarea>
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Question Type</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="border border-[#27569E] px-4 py-2 w-full  focus:ring-2 focus:ring-[#27569E] outline-none"
                >
                  <option value="" disabled>Select Question Type</option>
                  <option value="Objective">Objective</option>
                  <option value="Subjective">Subjective</option>
                </select>
              </div>

              {/* CLO Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CLO Type</label>
                <select
                  value={cloType}
                  onChange={(e) => setCloType(e.target.value)}
                  className="border border-[#27569E] px-4 py-2 w-full  focus:ring-2 focus:ring-[#27569E] outline-none"
                >
                  <option value="1">CLO 1</option>
                  <option value="2">CLO 2</option>
                  <option value="3">CLO 3</option>
                </select>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditingIndex(null);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuestion}
                  className="bg-[#27569E] hover:bg-blue-900 text-white px-6 py-2  transition-all"
                >
                  {editingIndex !== null ? "Update Question" : "Save Question"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizQuestions;
