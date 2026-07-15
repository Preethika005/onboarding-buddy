import React from "react";
import "../css/StatsCard.css";

import {
    FaUsers,
    FaUserPlus,
    FaTasks,
    FaBuilding
} from "react-icons/fa";

const StatsCards = () => {

    const stats = [

        {
            title:"Employees",
            value:125,
            icon:<FaUsers/>,
            color:"#0176d3"
        },

        {
            title:"New Joiners",
            value:12,
            icon:<FaUserPlus/>,
            color:"#8e44ad"
        },

        {
            title:"Pending Tasks",
            value:18,
            icon:<FaTasks/>,
            color:"#ff9800"
        },

        {
            title:"Departments",
            value:6,
            icon:<FaBuilding/>,
            color:"#2ecc71"
        }

    ];

    return (

        <div className="statsContainer">

            {

                stats.map((card,index)=>(

                    <div className="statCard" key={index}>

                        <div
                            className="iconCircle"
                            style={{background:card.color}}
                        >

                            {card.icon}

                        </div>

                        <h2>{card.value}</h2>

                        <p>{card.title}</p>

                    </div>

                ))

            }

        </div>

    );

};

export default StatsCards;