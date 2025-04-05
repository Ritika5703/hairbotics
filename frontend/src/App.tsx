import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Navbar />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
