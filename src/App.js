import React, { useState } from "react";
import Papa from "papaparse";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };
  const handleParse = () => {
    if (!file) return setError("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      console.log("PARSED DATA", parsedData);

      setData(parsedData);
    };
    reader.readAsText(file);
  };

  const ServiceCallList = ({ serviceCalls }) => {
    return (
      <div>
        {serviceCalls.map((serviceCall) => (
          <div key={serviceCall["Service call no"]} className="card">
            <div className="card-body">
              <h5 className="card-title">
                Service Call {serviceCall["Service call no"]}
              </h5>
              <p className="card-text">
                <strong>Required Skill:</strong>{" "}
                {serviceCall[" Service call required skill"]}
              </p>
              <p className="card-text">
                <strong>Engineer:</strong> {serviceCall[" Enginner"]}
              </p>
              <p className="card-text">
                <strong>Priority:</strong> {serviceCall[" Priority"]}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <label htmlFor="csvInput" style={{ display: "block" }}>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id="csvInput"
        name="file"
        type="File"
      />
      <div>
        <button onClick={handleParse}>Parse</button>
      </div>

      <ServiceCallList serviceCalls={data} />

      {/* <div className="container">
        {data.map((value, index) => {
          return (
            <tr key={index}>
              {value.map((val, i) => {
                return <td key={i}>{val}</td>;
              })}
            </tr>
          );
        })}
      </div> */}
    </div>
  );
};

export default App;
