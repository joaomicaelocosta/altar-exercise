import React from "react";
import { CodeProvider } from "./contexts/CodeContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  NavLink,
} from "react-router-dom";
import Generator from "./pages/Generator";
import Payments from "./pages/Payments";
import "./styles/components/App.scss";

function RedirectComponent() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/") {
      window.location.href = "/generator";
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <CodeProvider>
        <PaymentProvider>
          <div>
            <div className="nav">
              <NavLink to="/generator">Generator</NavLink>/
              <NavLink to="/payments">Payments</NavLink>
            </div>

            <Routes>
              <Route path="/" element={<RedirectComponent />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/payments" element={<Payments />} />
            </Routes>
          </div>
        </PaymentProvider>
      </CodeProvider>
    </Router>
  );
}

export default App;
