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

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />}></Route>
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
