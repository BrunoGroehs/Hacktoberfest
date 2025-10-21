import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Innovation from "./pages/Innovation/Innovation";
import InnerOpenSource from "./pages/InnerOpenSource/InnerOpenSource";
import AimTrackingGame from "./pages/AimTrackingGame/AimTrackingGame";
import Shellbar from "./pages/components/Shellbar";

function App() {
  return (
    <Router>
      <Shellbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/inner-open-source" element={<InnerOpenSource />} />
        <Route path="/aim-tracking-game" element={<AimTrackingGame />} />
      </Routes>
    </Router>
  );
}

export default App;
