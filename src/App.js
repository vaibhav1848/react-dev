import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import styles from './components/style.module.css'
import './App.css';
import './new.css';

//import RecentData from './components/RecentData'; // Import the RecentData component
import LatestData from './components/LatestData';

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [input7, setInput7] = useState('');

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState('')

  const handleInputChange = (e, setInput) => {
    const inputValue = e.target.value;
    setInput(inputValue);
  };
  //
  const handleChange = (e) => {
    let uen = /^\d{7}(o-9)\w{1}(A-Za-z)$/;
    let emailver = /^\S+@\S+\.\S+$/;
    switch (e.target.value) {
      case "input1": (input1.test(e.target.value) || e.target.value === '')
            ? setError({ ...error, input1: false })
            : setError({ ...error, input1: true })
            break;
      case "input5": (input5.test(e.target.value) || e.target.value === '')
            ? setError({ ...error, input5: false })
            : setError({ ...error, input5: true })
            break;

            case "input6": (e.target.value !== document.getElementsByName('input5')[0].value)
            ? setError({ ...error, input6: true })
            : setError({ ...error, input6: false })
            break;

        default:
            break;

    }

}
  //

  function onSingleFileSelect(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFile(file);
    }
  }

  function checkBoxSubmit() {
    setCheckboxValue(true);
  }

  const handleSubmit = async () => {
    if (input1 && input2 && input3 && input4 && input5 && input6 && input7 && checkboxValue) {
      try {
        // Send the data to the backend
        const response = await axios.post('http://localhost:5000/submit', {
          input1,
          input2,
          input3,
          input4,
          input5,
          input6,
          input7,
        });
        console.log(response.data);
        setDataFetched(true);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please fill in all the required fields and accept the terms and conditions.');
    }
  };

  return (
    <div>
      <h2 className= "heading"> Company Info </h2>
      {/* <label  htmlFor="companyuen">Company UEN: </label> */}
      <input className="forminput"
        type="text"
        placeholder="Company UEN"
        id="input1"
        value={input1}
        onChange={(e) => handleInputChange(e, setInput1)}
      />
      
      
      
     <br />
     <br/>
      {/* <label htmlFor="companyname">Company Name: </label> */}
      <input 
        type="text"
        placeholder="Company Name"
        id="input2"
        value={input2}
        onChange={(e) => handleInputChange(e, setInput2)}
        disabled={!input1}
      />
      <br />
      
      <h2 >Applicant Info</h2>
      {/* <label htmlFor="fullname">Full Name: </label> */}
      <input
        type="text"
        placeholder="Full Name"
        value={input3}
        onChange={(e) => handleInputChange(e, setInput3)}
        disabled={!input2}
      />
      <br />
      <br/>
      {/* <label htmlFor="position">Position: </label> */}
      <input
        type="text"
        placeholder="Position"
        value={input4}
        onChange={(e) => handleInputChange(e, setInput4)}
        disabled={!input3}
      />
      <br />
      <br/>
      {/* <label htmlFor="email">Email: </label> */}
      <input
        type="text"
        placeholder="Email"
        value={input5}
        onChange={(e) => handleInputChange(e, setInput5)}
        disabled={!input4}
      />
      <br />
      <br/>
      {/* <label htmlFor="reemail">Re-enter Email: </label> */}
      <input
        type="text"
        placeholder="Re-enter Email"
        value={input6}
        onChange={(e) => handleInputChange(e, setInput6)}
        disabled={!input5}
      />
      <br />
      <br/>
      {/* <label htmlFor="phone">Phone: </label> */}
      <input
        type="text"
        placeholder="Phone"
        value={input7}
        onChange={(e) => handleInputChange(e, setInput7)}
        disabled={!input6}
      />
      <br />
      <br/>
      <h2 className= "heading">Upload Files</h2>
      <input type="file" onClick={onSingleFileSelect} disabled={!input7} />
      <br />
      <br/>
      <h2 className= "heading">Terms And Conditions</h2>
      <input type="checkbox" onClick={checkBoxSubmit} disabled={!fileName} />
      <p>These are the terms and conditions</p>
      {checkboxValue && <button onClick={handleSubmit}>Submit</button>}
      
      {checkboxValue&&<button><Link to = "/Confirmation">Show Data</Link></button>}
      {/* {<LatestData />} */}
    </div>
  );
};

const Button = styled.button`
  font-size: 2rem;
`;

export default App;
