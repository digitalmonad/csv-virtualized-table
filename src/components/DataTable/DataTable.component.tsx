import * as utils from "../../utils";

import React, { ChangeEvent, useEffect, useState } from "react";

import { UploadButton } from "./components/UploadButton";
import styled from "styled-components";

export const DataTable = () => {
  const [tableRows, setTableRows] = useState<any>();
  const [tableHeaders, setTableHeaders] = useState<any>();

  const parse = async (path: any) => {
    const parseResult = await utils.parseCSV(path);

    const [headers, ...rows] = parseResult.data;
    setTableHeaders(headers);

    setTableRows(rows);
  };

  const handleFileUpload = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    parse(file);
  };

  return (
    <Root>
      <Controls>
        <UploadButton onChange={handleFileUpload} />
      </Controls>
      <Content>
        {tableHeaders && tableRows ? (
          <table>
            <thead>
              <tr>
                {tableHeaders.map((x: string) => (
                  <td>{x}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row: any) => {
                return (
                  <tr>
                    {row.map((x: string) => (
                      <td>{x}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>Please upload data</div>
        )}
      </Content>
    </Root>
  );
};

const Root = styled.div`
  background-color: white;
  height: 100vh;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: 10px;
    height: inherit;
  }
`;

const Content = styled.div`
  @media (min-width: 768px) {
    border-radius: 10px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px;
`;
