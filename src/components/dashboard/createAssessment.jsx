import axios from "axios";
import { useState } from "react";

const CreateAssessment = ({ AssessmentType, onGenerate, onClose }) => {
  const courseCLOMap = {
    "Web Development": [
      "Understand HTML",
      "Style with CSS",
      "Create apps using React",
    ],
    "Machine Learning": [
      "Understand regression",
      "Train classification models",
      "Evaluate model performance",
    ],
  };

  const [selectedCourse, setSelectedCourse] = useState("");
  const [clos, setCLOs] = useState([]);
  const [showCLODropdown, setShowCLODropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    assessmentType: AssessmentType,
    courseName: "",
    courseLevel: "undergraduate",
    topic: "",
    selectedCLOs: [],
    difficultyLevel: "medium",
    numberOfQuestions: 5,
    questionTypes: ["multiple-choice"],
    timeLimit: 30,
    additionalInstructions: "",
  });

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

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    setCLOs(courseCLOMap[course] || []);
    setFormData((prev) => ({ ...prev, selectedCLOs: [] })); // Reset selected CLOs
  };

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

  const toggleCLOSelection = (cloText) => {
    const selected = [...formData.selectedCLOs];
    if (selected.includes(cloText)) {
      setFormData({
        ...formData,
        selectedCLOs: selected.filter((text) => text !== cloText),
      });
    } else {
      setFormData({
        ...formData,
        selectedCLOs: [...selected, cloText],
      });
    }
  };

  const generateAssessment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const selectedCLOsText = formData.selectedCLOs.join("\n");

    const prompt = `
      Create a ${formData.assessmentType} for the course "${selectedCourse}"
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/gemini/generate`,
        { prompt: prompt }
      );

      const generatedAssessment = response.data.content;

      onGenerate(generatedAssessment);
    } catch (error) {
      console.error("Error generating:", error);
      alert(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="w-[60%] h-full" onClick={onClose}></div>
      <div className="w-[40%] h-full overflow-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          AI Assessment Generator
        </h1>

        <form onSubmit={generateAssessment} className="space-y-6">
          {/* Course and Level Selects */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="border px-4 py-2 rounded w-full"
            >
              <option value="">Select a course</option>
              {Object.keys(courseCLOMap).map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Course Level
            </label>
            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {courseTypes.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Topic or Unit
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Object-Oriented Programming Concepts"
              required
            />
          </div>

          {/* CLOs Section */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Course Learning Outcomes (CLOs)
            </h2>

            <div className="flex flex-wrap gap-2 mb-3">
              {formData.selectedCLOs.map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  <span className="mr-2 text-sm">{text}</span>
                  <button
                    type="button"
                    onClick={() => toggleCLOSelection(text)}
                    className="text-blue-600 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {clos.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setShowCLODropdown(!showCLODropdown)}
                  className="mb-3 px-3 py-1 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300"
                >
                  {showCLODropdown ? "Hide CLOs" : "Select CLOs"}
                </button>

                {showCLODropdown && (
                  <div className="space-y-2">
                    {clos.map((clo, index) => (
                      <label key={index} className="block">
                        <input
                          type="checkbox"
                          checked={formData.selectedCLOs.includes(clo)}
                          onChange={() => toggleCLOSelection(clo)}
                          className="mr-2"
                        />
                        {clo}
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Question Type Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Question Types
            </label>
            <div className="flex flex-wrap gap-3">
              {questionTypeOptions.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.questionTypes.includes(type)}
                    onChange={() => handleQuestionTypeChange(type)}
                    className="text-blue-600"
                  />
                  <span className="capitalize">{type.replace(/-/g, " ")}</span>
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
              value={formData.timeLimit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Additional Instructions
            </label>
            <textarea
              name="additionalInstructions"
              value={formData.additionalInstructions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;
