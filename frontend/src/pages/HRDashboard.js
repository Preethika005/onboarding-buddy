import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import StatsCards from "../components/StatsCard";
// import EmployeeTable from "../components/EmployeeTable";
const HRDashboard = () => {

    return (

        <div>

            <Sidebar/>
            {/* <Navbar /> */}
            <WelcomeBanner/>
            {/* <StatsCards/> */}
             {/* <EmployeeTable /> */}
        </div>

    );

};

export default HRDashboard;