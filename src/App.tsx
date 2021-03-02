import "./App.css";

import * as utils from "./utils/index";

import React, { ChangeEvent, useEffect, useState } from "react";

const App = () => {
  const [tableData, setTableData] = useState<any>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const rawData = await utils.fetchRawCSV();
  //     const data = await utils.parseCSV(rawData);
  //     setTableData(data);
  //   };
  //   fetchData();
  // }, []);

  const handler = async (path: any) => {
    // const rawData = await utils.fetchRawCSV(path);
    // console.log(rawData);
    const data = await utils.parseCSV(path);
    console.log(data);
    // setTableData(data);
  };

  return (
    <div className='App'>
      <label>
        <input
          style={{ display: "none" }}
          type={"file"}
          onChange={(e: ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];

            handler(file);
          }}
        />
        Upload CSV
      </label>
      {tableData && (
        <table>
          <thead>
            <tr>
              {tableData.data[0].map((x: string) => (
                <td>{x}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {console.log(tableData.data[0])}
            <tr></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
