import { useEffect, useState } from "react";
import axios from "axios";
import "../css/EmployeeList.css";
import { FaUserCircle, FaEllipsisH } from "react-icons/fa";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "completed";

      case "IN_PROGRESS":
        return "progress";

      default:
        return "notstarted";
    }
  };

  return (
    <div className="employeePage">
      <div className="employeeHeader">
        <div>
          <h1>Employees</h1>

          <p>Total {employees.length} Employees</p>
        </div>

      </div>

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Employee</th>

              <th>Department</th>

              <th>Designation</th>

              <th>Email</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.user_id}>
                <td>
                  <div className="employeeInfo">
                    <FaUserCircle className="avatar" />

                    <div>
                      <h4>{emp.name}</h4>

                      <span>User ID: {emp.user_id}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="department">{emp.department}</span>
                </td>

                <td>{emp.designation}</td>

                <td>{emp.email}</td>

                <td>
                  <span className={getStatusClass(emp.onboarding_status)}>
                    {emp.onboarding_status}
                  </span>
                </td>

                <td>
                  <FaEllipsisH className="dots" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
