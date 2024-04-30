import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UrlDashboard = () => {
  

    const [dailyCounts, setDailyCounts] = useState([]);
    const [monthlyCount, setMonthlyCount] = useState([]);

    useEffect(() => {
        // Define a function to fetch the data from the backend
        const fetchData = async () => {
            try {
                // Make a GET request to fetch the URL counts
               
                const response = await axios.get("https://url-shortener-backend-cu3r.onrender.com/api/user/geturlcounts");
                // Extract the dailyCounts and monthlyCount from the response data
                const { dailyCounts, monthlyCount } = response.data;
                // Update the state with the fetched data
                setDailyCounts(dailyCounts);
                setMonthlyCount(monthlyCount);
                console.log("Daily Counts:", dailyCounts);
console.log("Monthly Count:", monthlyCount);

            } catch (error) {
                // Handle any errors
                console.error("Error fetching URL counts:", error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []); // Empty dependency array ensures that this effect runs only once

    return (
        <div>
            <h2 className='my-5 text-center'>Daily Counts</h2>

            <div className='table-responsive'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Username</th>
                            <th scope="col" className='text-center'>URL Count</th>
                            <th scope="col" className='text-center'>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyCounts.map((item, index) => {
                            return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='text-center '>{item._id.lastname}</td>
                                        <td className='text-center'>{item.count}</td>
                                        <td className='text-center'>{item._id.date}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <h2 className='my-5 text-center'>Monthly Count</h2>
            <div className='table-responsive'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Username</th>
                            <th scope="col" className='text-center'>URL Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyCount.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='text-center'>{item._id}</td>
                                        <td className='text-center'>{item.count}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UrlDashboard;