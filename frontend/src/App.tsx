import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignUp,
  SignIn,
} from "@clerk/clerk-react";
import PhotoPage from "./pages/PhotoPage/PhotoPage";
import AnalysisPage from "./pages/AnalysisPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ImageHistory from "./pages/ImageHistory";
import AboutUs from "./pages/AboutUs";
import Team from "./pages/Team";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ContactUs from "./components/ContactUs";

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/login"
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard/analysis" replace />
              </SignedIn>
              <SignedOut>
                <div className="flex items-center justify-center h-screen">
                  <SignIn />
                </div>
              </SignedOut>
            </>
          }
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={
            <div className="flex items-center justify-center h-screen">
              <SignUp />
            </div>
          }
        />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="photo" element={<PhotoPage />} />
          <Route path="/dashboard/history" element={<ImageHistory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
