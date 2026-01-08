import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
// Admin routes are mounted inside AppRoutes at /admin/*
import './styles/variables.css';
import Footer from './components/layout/Footer';

function AppInner() {
  const { pathname } = useLocation();

  // Show the footer only on the landing page ("/") and the dashboard ("/dashboard").
  const showFooter = pathname === '/' || pathname === '/dashboard';

  return (
    <>
      <Navbar />
      <AppRoutes />
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
