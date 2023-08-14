import React from "react";

const Dashboard = () => {
    const user = localStorage.getItem('userName');
    return (
       
        <div>
            <h1>Welcome {user}</h1>
        </div>
    );
}

export default Dashboard;