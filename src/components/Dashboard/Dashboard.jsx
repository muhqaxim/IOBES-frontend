import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import ExamManagement from "./Exam/ExamManagement";
import QuizQuestions from "./Quiz/QuizQuestions";
import QuizManagement from "./Quiz/QuizManagement";
import CreateExam from "./Exam/CreateExam";
import AssignmentManagement from "./Assignment/AssignmentManagement";
import CoarseManagement from "./Coarse/CoarseManagement";
import CreateAssignment from "./Assignment/CreateAssignment";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Sidebar */}
      <div className="w-full lg:w-[25%] xl:w-[18%] bg-blue-800 text-white flex flex-col shadow-lg">
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 ">
        <Routes>
          <Route
            path="/exam-questions/:id/:examName"
            element={<CreateExam />}
          />
          <Route index element={<Welcome />} />
          {/* coarse */}
          <Route path="coarse-management" element={<CoarseManagement />} />
          {/* quiz */}
          <Route path="quiz-management" element={<QuizManagement />} />
          <Route
            path="quiz-questions/:courseName/:quizNo"
            element={<QuizQuestions />}
          />
          {/* exam */}
          <Route path="exam-management" element={<ExamManagement />} />
          <Route path="/exam-questions/:id" element={<CreateExam />} />
          {/* assignment */}
          <Route
            path="assignment-management"
            element={<AssignmentManagement />}
          />
          <Route
            path="assignment-questions/:courseName/:assignmentNo"
            element={<CreateAssignment />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
