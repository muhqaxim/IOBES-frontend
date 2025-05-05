import { Link } from "react-router-dom";

const cardData = [
  {
    title: "Assignment",
    description: "Manage your assignments effortlessly with AI insights.",
    iconSrc: "Assigment.png",
    iconAlt: "Assignment Icon",
    link: "/dashboard/assignment-management",
  },
  {
    title: "Quiz",
    description:
      "Take quizzes with real-time AI feedback and performance analysis.",
    iconSrc: "quiz.png",
    iconAlt: "Quiz Icon",
    link: "/dashboard/quiz-management",
  },
  {
    title: "Exam",
    description: "Take AI-assisted exams for accurate results and insights.",
    iconSrc: "Exam.png",
    iconAlt: "Exam Icon",
    link: "/dashboard/exam-management",
  },
  {
    title: "Course",
    description:
      "Explore courses designed to help you excel with AI-powered guidance.",
    iconSrc: "Course.png",
    iconAlt: "Course Icon",
    link: "/dashboard/course-management",
  },
];

const Welcome = () => {
  return (
    <main className="min-h-screen flex flex-col  bg-white">
      {/* header  */}
      <div className="text-center items-center py-12 flex justify-center flex-col space-y-6 mb-12 bg-gradient-to-tr from-[#141E30] to-[#243B55] p-8 rounded-sm shadow-lg">
        <h1 className="text-2xl md:text-3xl justify-center flex items-center xl:w-[85%] lg:text-4xl 2xl:text-6xl font-bold text-white tracking-wider leading-10">
          Welcome To AI-Powered Outcome Based Examination System
        </h1>
        <p className="text-white text-base md:text-lg xl:text-xl font-medium tracking-wide">
          Revolutionizing online exams with AI-driven insights.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-4 sm:px-8">
        {cardData.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="p-6 bg-white rounded-sm border border-blue-600 shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-50"
          >
            <div className="flex justify-center mb-4">
              <img
                src={card.iconSrc}
                alt={card.iconAlt}
                className="w-14 h-14 transition-transform transform animate-bounce "
              />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-900">
              {card.title}
            </h2>
            <p className="text-gray-700 text-center mt-2">{card.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Welcome;
