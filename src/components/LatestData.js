import React, { useState, useEffect } from 'react';

const LatestData = () => {
  const [latestData, setLatestData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch('http://localhost:5000/latest-data')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch latest data');
        }
      })
      .then((data) => {
        setLatestData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); 

  return (
    <div>
      <h2>Latest Data</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : latestData ? (
        <div>
          <p>Company UEN: {latestData.input1}</p>
          <p>Company Name: {latestData.input2}</p>
          <p>Full Name: {latestData.input3}</p>
          <p>Position: {latestData.input4}</p>
          <p>Email: {latestData.input5}</p>
          <p>Phone: {latestData.input7}</p>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LatestData;
