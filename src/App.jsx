import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "@fontsource/inter";
import "@fontsource/roboto-mono";
import Navbar from "./components/home/navbar";
import Footer from "./components/home/footer";
import FAQs from "./components/home/faqs";
import FeaturesAndContact from "./components/home/featuresAndContact";
import HeroAndAbout from "./components/home/heroAndAbout";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard/dashboard";
import AboutPage from "./components/about/aboutPage";
import ScrollToTop from "./components/scrollToTop";
import AdminLogin from "./components/adminLogin";
import AdminDashboard from "./components/adminDashboard/adminDashboard";
import FacultyManagement from "./components/adminDashboard/facultyManagement";
import CourseManagement from "./components/adminDashboard/courseManagement";

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
