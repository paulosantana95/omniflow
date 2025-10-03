import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import TermosDeUso from "./pages/TermosDeUso";
import ChangelogPage from "./pages/ChangelogPage";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/changelog" element={<ChangelogPage />} />
        </Routes>
      </Router>
    </>
  );
}