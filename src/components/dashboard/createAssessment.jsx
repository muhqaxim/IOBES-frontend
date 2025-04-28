import { useState } from "react";

const CreateAssessment = ({ AssessmentType, onClose }) => {
  const [formData, setFormData] = useState({
    assessmentType: AssessmentType,
    courseName: "",
    courseCode: "",
    courseLevel: "undergraduate",
    topic: "",
    selectedCLOs: [],
    difficultyLevel: "medium",
    numberOfQuestions: 5,
    questionTypes: ["multiple-choice"],
    timeLimit: 30,
    additionalInstructions: "",
  });

  const [clos, setCLOs] = useState([{ id: 1, text: "" }]);

  const courseTypes = [
    "undergraduate",
    "graduate",
    "professional",
    "certification",
  ];
  const difficultyLevels = ["easy", "medium", "hard", "mixed"];
  const questionTypeOptions = [
    "multiple-choice",
    "true-false",
    "short-answer",
    "essay",
    "problem-solving",
    "matching",
    "fill-in-the-blank",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionTypeChange = (type) => {
    const currentTypes = formData.questionTypes;
    if (currentTypes.includes(type)) {
      setFormData({
        ...formData,
        questionTypes: currentTypes.filter((t) => t !== type),
      });
    } else {
      setFormData({
        ...formData,
        questionTypes: [...currentTypes, type],
      });
    }
  };

  const addCLO = () => {
    setCLOs([...clos, { id: clos.length + 1, text: "" }]);
  };

  const updateCLO = (id, text) => {
    setCLOs(clos.map((clo) => (clo.id === id ? { ...clo, text } : clo)));
  };

  const removeCLO = (id) => {
    if (clos.length > 1) {
      setCLOs(clos.filter((clo) => clo.id !== id));
    }
  };

  const toggleCLOSelection = (id) => {
    const currentSelected = [...formData.selectedCLOs];
    if (currentSelected.includes(id)) {
      setFormData({
        ...formData,
        selectedCLOs: currentSelected.filter((cloId) => cloId !== id),
      });
    } else {
      setFormData({
        ...formData,
        selectedCLOs: [...currentSelected, id],
      });
    }
  };

  const generateAssessment = (e) => {
    e.preventDefault();

    // Prepare selected CLOs text for the prompt
    const selectedCLOsText = clos
      .filter((clo) => formData.selectedCLOs.includes(clo.id))
      .map((clo) => clo.text)
      .join("\n");

    // Constructing the prompt that would be sent to the AI
    const prompt = `
      Create a ${formData.assessmentType} for the course "${
      formData.courseName
    }" (${formData.courseCode})
      Course level: ${formData.courseLevel}
      Topic: ${formData.topic}
      
      Course Learning Outcomes to assess:
      ${selectedCLOsText}
      
      Difficulty level: ${formData.difficultyLevel}
      Number of questions: ${formData.numberOfQuestions}
      Question types: ${formData.questionTypes.join(", ")}
      Time limit: ${formData.timeLimit} minutes
      
      Additional instructions:
      ${formData.additionalInstructions}
    `;

    console.log("Prompt for AI:", prompt);
    alert(
      "Assessment prompt generated! In a real application, this would be sent to an AI model."
    );
    onClose();
  };

  return (
    <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="w-[60%] h-full" onClick={onClose}></div>
      <div className="w-[40%] h-full overflow-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          AI Assessment Generator
        </h1>

        <form onSubmit={generateAssessment} className="space-y-6">
          
          {/* Course Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Introduction to Computer Science"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Course Code
              </label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CS101"
                required
              />
            </div>
          </div>

          {/* Course Level */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Course Level
            </label>
            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courseTypes.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Topic or Unit
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Object-Oriented Programming Concepts"
              required
            />
          </div>

          {/* CLOs Section */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Course Learning Outcomes (CLOs)
            </h2>

            {clos.map((clo) => (
              <div key={clo.id} className="mb-3 flex items-start">
                <input
                  type="checkbox"
                  checked={formData.selectedCLOs.includes(clo.id)}
                  onChange={() => toggleCLOSelection(clo.id)}
                  className="mt-2 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-2 flex-grow">
                  <textarea
                    value={clo.text}
                    onChange={(e) => updateCLO(clo.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`CLO ${clo.id}: e.g., Students will be able to apply object-oriented principles to design software solutions`}
                    rows="2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCLO(clo.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCLO}
              className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + Add Another CLO
            </button>
          </div>

          {/* Assessment Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Difficulty Level
              </label>
              <select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                min="1"
                max="50"
                value={formData.numberOfQuestions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Question Types */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Question Types (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {questionTypeOptions.map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.questionTypes.includes(type)}
                    onChange={() => handleQuestionTypeChange(type)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 capitalize">
                    {type.replace("-", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              name="timeLimit"
              min="5"
              max="180"
              value={formData.timeLimit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Additional Instructions for AI
            </label>
            <textarea
              name="additionalInstructions"
              value={formData.additionalInstructions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="e.g., Include real-world examples, focus on application of concepts, provide detailed solutions"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 hover:bg-[#141E30] text-white font-medium rounded-md bg-[#1C2B4A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate{" "}
              {formData.assessmentType.charAt(0).toUpperCase() +
                formData.assessmentType.slice(1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;
