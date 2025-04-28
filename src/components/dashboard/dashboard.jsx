import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Welcome from "./welcome";
import ExamManagement from "./exam/examManagement";
import QuizManagement from "./quiz/quizManagement";
import AssignmentManagement from "./assignment/assignmentManagement";
import CourseManagement from "./course/courseManagement";

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
          <Route index element={<Welcome />} />
          {/* coarse */}
          <Route path="course-management" element={<CourseManagement />} />
          {/* quiz */}
          <Route path="quiz-management" element={<QuizManagement />} />
          {/* exam */}
          <Route path="exam-management" element={<ExamManagement />} />
          {/* assignment */}
          <Route
            path="assignment-management"
            element={<AssignmentManagement />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
