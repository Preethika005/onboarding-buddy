import React from "react";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import salesforceLogo from "../assets/salesforcelogo.png";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaClipboardList,
  FaBook,
  FaChartLine,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { FaCloud } from "react-icons/fa";


const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={salesforceLogo} alt="Salesforce" className="logoImage" />

        <h2>OnboardMate</h2>
      </div>

      <ul>
        <li className="active">
          <FaHome />
          Dashboard
        </li>

        <li onClick={() => navigate("/employees")}>
          <FaUsers />
          Employees
        </li>

        <li onClick={()=>navigate("/addEmployee")}>
          <FaUserPlus />
          Add Employee
        </li>

        <li>
          <FaBuilding />
          Departments
        </li>

        <li>
          <FaClipboardList />
          Tasks
        </li>

        <li>
          <FaBook />
          Resources
        </li>

        <li>
          <FaChartLine />
          Progress
        </li>

        <li>
          <FaComments />
          Feedback
        </li>

        <li>
          <FaBell />
          Notifications
        </li>

        <li>
          <FaCog />
          Settings
        </li>
      </ul>

      <button className="logout">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
