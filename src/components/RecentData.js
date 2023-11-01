// RecentData.js
import React, { useState, useEffect } from 'react';

const RecentData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/recent-data');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching recent data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Recent Data</h2>
      <table>
        <thead>
          <tr>
            <th>Company UEN</th>
            <th>Company Name</th>
            <th>Full Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.input1}</td>
              <td>{item.input2}</td>
              <td>{item.input3}</td>
              <td>{item.input4}</td>
              <td>{item.input5}</td>
              <td>{item.input7}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentData;
