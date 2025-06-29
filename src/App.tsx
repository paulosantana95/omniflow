import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import TermosDeUso from "./pages/TermosDeUso";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
        </Routes>
      </Router>
    </>
  );
}