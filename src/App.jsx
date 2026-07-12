import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import ComplaintFormPage from "./pages/ComplaintFormPage";
import SOSPage from "./pages/SOSPage";
import SyllabusSummarizerPage from "./pages/SyllabusSummarizerPage";
import RuleCheckerPage from "./pages/RuleCheckerPage";
import CaptainDashboard from "./pages/CaptainDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/complain" element={<ComplaintFormPage />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/syllabus" element={<SyllabusSummarizerPage />} />
          <Route path="/rules" element={<RuleCheckerPage />} />
          <Route path="/captain" element={<CaptainDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}