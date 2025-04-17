import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "@fontsource/inter";
import "@fontsource/roboto-mono";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/Footer";
import FAQs from "./components/Home/Faqs";
import FeaturesAndContact from "./components/Home/FeaturesAndContact";
import HeroAndAbout from "./components/Home/HeroAndAbout";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutPage from "./components/About/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import FacultyManagement from "./components/AdminDashboard/FacultyManagement";
import CourseManagement from "./components/AdminDashboard/CourseManagement";
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <ConditionalLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroAndAbout />
                <FeaturesAndContact />
                <FAQs />
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin-dashboard/faculty-management"
            element={<FacultyManagement />}
          />
          <Route
            path="/admin-dashboard/course-management"
            element={<CourseManagement />}
          />
        </Routes>
      </ConditionalLayout>
    </Router>
  );
};

// ConditionalLayout Component
const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  // Define routes where Navbar and Footer should be shown login and register
  const showNavbarFooterPaths = ["/", "/about", "/"];

  // Conditionally show Navbar and Footer
  const shouldShowNavbarFooter = showNavbarFooterPaths.includes(
    location.pathname
  );

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />}{" "}
      {/* Render Navbar only on specific paths */}
      {children}
      {shouldShowNavbarFooter && <Footer />}{" "}
      {/* Render Footer only on specific paths */}
    </>
  );
};

// PropTypes validation for ConditionalLayout
ConditionalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
