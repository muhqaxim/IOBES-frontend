import React, { useState, useEffect } from 'react';
import { 
  FaChartPie, FaChartBar, FaUsers, FaBook, FaFileAlt, 
  FaListAlt, FaBell, FaUserCircle, FaSignOutAlt, FaSearch 
} from 'react-icons/fa';
import AdminLayout from './adminLayout';

// Sample JSON data
const sampleData = {
  stats: {
    facultyCount: 24,
    facultyIncrease: "+2 this month",
    courseCount: 32,
    courseIncrease: "+3 this week",
    assignmentCount: 156,
    assignmentIncrease: "+15 this week",
    quizCount: 78,
    quizIncrease: "+8 this week"
  },
  recentActivity: [
    {
      id: 1,
      user: "Dr. Sarah Johnson",
      action: "added a new assignment",
      context: "Advanced Database Systems",
      time: "15 minutes ago"
    },
    {
      id: 2,
      user: "Prof. Michael Chen",
      action: "modified CLOs for Web Development",
      context: "",
      time: "2 hours ago"
    },
    {
      id: 3,
      user: "Dr. Robert Garcia",
      action: "created a new quiz",
      context: "Software Engineering",
      time: "3 hours ago"
    },
    {
      id: 4,
      user: "Prof. Amanda Lee",
      action: "added 15 new questions to the Question Bank",
      context: "Data Structures",
      time: "5 hours ago"
    }
  ],
  cloCoverage: [
    { department: "Computer Science", percentage: 85 },
    { department: "Software Engineering", percentage: 78 },
    { department: "Data Science", percentage: 92 },
    { department: "Artificial Intelligence", percentage: 65 },
    { department: "Networking", percentage: 70 }
  ],
  recentItems: [
    {
      id: 1,
      title: "Database Design Assignment",
      course: "Advanced Database Systems",
      creator: "Dr. Sarah Johnson",
      type: "Assignment",
      date: "April 16, 2025",
      closCovered: 3
    },
    {
      id: 2,
      title: "Midterm Programming Quiz",
      course: "Software Engineering",
      creator: "Dr. Robert Garcia",
      type: "Quiz",
      date: "April 15, 2025",
      closCovered: 5
    },
    {
      id: 3,
      title: "Data Structures Final Project",
      course: "Data Structures",
      creator: "Prof. Amanda Lee",
      type: "Assignment",
      date: "April 14, 2025",
      closCovered: 6
    },
    {
      id: 4,
      title: "Web Development Quiz",
      course: "Web Development",
      creator: "Prof. Michael Chen",
      type: "Quiz",
      date: "April 12, 2025",
      closCovered: 4
    }
  ],
  currentUser: {
    name: "Admin User",
    notifications: 3
  }
};

// Reusable components
const StatCard = ({ icon: Icon, title, count, increase }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <div className="ml-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-darktext">{count}</p>
      </div>
    </div>
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-green-500 text-sm">{increase}</p>
        <p className="text-gray-500 text-sm">Total</p>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ user, action, context, time }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <FaUserCircle className="h-6 w-6 text-primary" />
      </div>
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-darktext">
        {user} {action}
      </p>
      <p className="text-sm text-gray-500">
        {context && `${context} - `}{time}
      </p>
    </div>
  </div>
);

const ProgressBar = ({ department, percentage }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-darktext">{department}</span>
      <span className="text-sm font-medium text-darktext">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-primary h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [data, setData] = useState(sampleData);
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching data from API
  useEffect(() => {
    // In a real application, you would fetch data from your API here
    const fetchData = async () => {
      try {
        // const response = await fetch('/api/dashboard');
        // const jsonData = await response.json();
        // setData(jsonData);
        
        // Using sample data for now
        setData(sampleData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    
    // Simulate API delay
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <AdminLayout>
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center rounded-lg bg-gray-100 p-2">
              <FaSearch className="h-5 w-5 text-gray-500" />
              <input
                className="ml-2 bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none relative">
                <FaBell className="h-6 w-6 text-darktext" />
                {data.currentUser.notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                )}
              </button>
              <div className="ml-4 flex items-center">
                <FaUserCircle className="h-8 w-8 text-darktext" />
                <span className="ml-2 text-darktext font-medium">{data.currentUser.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-darktext mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              icon={FaUsers} 
              title="Faculty Members" 
              count={data.stats.facultyCount} 
              increase={data.stats.facultyIncrease} 
            />
            <StatCard 
              icon={FaBook} 
              title="Active Courses" 
              count={data.stats.courseCount} 
              increase={data.stats.courseIncrease} 
            />
            <StatCard 
              icon={FaFileAlt} 
              title="Assignments" 
              count={data.stats.assignmentCount} 
              increase={data.stats.assignmentIncrease} 
            />
            <StatCard 
              icon={FaListAlt} 
              title="Quizzes" 
              count={data.stats.quizCount} 
              increase={data.stats.quizIncrease} 
            />
          </div>
          
          {/* Recent Activity and CLO Coverage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-blue-100">
                <h2 className="text-lg font-semibold text-darktext">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {data.recentActivity.map(activity => (
                    <ActivityItem 
                      key={activity.id}
                      user={activity.user}
                      action={activity.action}
                      context={activity.context}
                      time={activity.time}
                    />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-primary hover:underline font-medium">View All Activity</button>
                </div>
              </div>
            </div>
            
            {/* CLO Coverage */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-blue-100">
                <h2 className="text-lg font-semibold text-darktext">CLO Coverage Overview</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {data.cloCoverage.map((item, index) => (
                    <ProgressBar 
                      key={index}
                      department={item.department}
                      percentage={item.percentage}
                    />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-primary hover:underline font-medium">View Detailed Report</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Assignments Table */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-lg font-semibold text-darktext">Recent Assignments & Quizzes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Created By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darktext uppercase tracking-wider">
                      CLOs Covered
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {data.recentItems.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-darktext">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.creator}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.type === 'Assignment' ? 'bg-blue-100 text-primary' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.closCovered} CLOs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-blue-100 text-center">
              <button className="text-primary hover:underline font-medium">View All</button>
            </div>
          </div>
        </main>
      </AdminLayout>
  );
}