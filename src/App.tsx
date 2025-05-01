import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Dashboard from "./pages/Dashboard";
import TierList from "./pages/TierList";
import VoidFissuresPage from "./pages/VoidFissuresPage";

function App() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fissures" element={<VoidFissuresPage />} />
                <Route path="/tierlist" element={<TierList />} />
            </Routes>
        </div>
    );
}

export default App;
