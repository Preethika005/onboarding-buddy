import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AddEmployee from "./pages/AddEmployee";
import Employeelist from "./pages/EmployeeList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hr" element={<HRDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/employees" element={<Employeelist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;