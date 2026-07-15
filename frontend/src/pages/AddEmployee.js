import { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddEmployee.css";
import astroImage from "../assets/astro-2.jpeg";
// import { useEffect } from "react";
function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    joining_date: "",
    manager_id: "",
  });
  const [managers, setManagers] = useState([]);
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/managers").then((res) => {
      setManagers(res.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/addEmployee", employee);

    alert(res.data.message);

    setEmployee({
      name: "",
      email: "",
      password: "",
      phone: "",
      department: "",
      designation: "",
      joining_date: "",
      manager_id: "",
    });
  };

  return (
    <div className="addEmployeePage">
      <div className="employeeCard">
        <div className="header">
          <h1>👨‍💼 Add New Employee</h1>
          <p>Create an employee account and start their onboarding journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputGrid">
            <div className="inputGroup">
              <label>Full Name</label>
              <input
                name="name"
                value={employee.name}
                placeholder="Enter employee name"
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Email</label>
              <input
                name="email"
                value={employee.email}
                placeholder="example@gmail.com"
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={employee.password}
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Phone Number</label>
              <input
                name="phone"
                value={employee.phone}
                placeholder="9876543210"
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Department</label>
              <input
                name="department"
                value={employee.department}
                placeholder="IT"
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Designation</label>
              <input
                name="designation"
                value={employee.designation}
                placeholder="Software Engineer"
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Joining Date</label>
              <input
                type="date"
                name="joining_date"
                value={employee.joining_date}
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>Manager ID</label>
              <select
                name="manager_id"
                value={employee.manager_id}
                onChange={handleChange}
              >
                <option value="">Select Manager</option>

                {managers.map((manager) => (
                  <option key={manager.Manager_ID} value={manager.Manager_ID}>
                    {manager.name} ({manager.Department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="createBtn">✨ Create Employee</button>
        </form>
      </div>
      <img
    src={astroImage}
    alt="Astro"
    className="astroMascot"
/>
    </div>
    
  );
}

export default AddEmployee;
