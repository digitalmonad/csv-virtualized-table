import * as utils from "../../utils";

import React, { ChangeEvent, useMemo, useState } from "react";

import { ReactWindowTable } from "./components/ReactWindowTable";
import { UploadButton } from "./components/UploadButton";
import styled from "styled-components";

export const DataTable = () => {
  const [tableRows, setTableRows] = useState<any>();
  const [tableColumns, setTableColumns] = useState<any>();

  const parse = async (path: any) => {
    const parseResult = await utils.parseCSV(path);
    const [columns, ...rows] = parseResult.data;
    setTableColumns(columns);
    setTableRows(rows);
  };

  const preprocessTableColumns = () =>
    tableColumns
      ? tableColumns.map((x: string) => ({ Header: x, accessor: x }))
      : [];

  const preprocessTableRows = () =>
    tableRows
      ? tableRows.map((x: any, index: number) => {
          const obj: { [key: string]: string } = {};
          x.forEach((x: string, index: number): void => {
            obj[tableColumns[index]] = x;
          });
          return obj;
        })
      : [{}];

  const handleFileUpload = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    parse(file);
  };

  const columns = useMemo<any>(preprocessTableColumns, [tableColumns]);
  const data = useMemo<any>(preprocessTableRows, [tableRows, tableColumns]);

  return (
    <Root>
      <Controls>
        <UploadButton onChange={handleFileUpload} />
      </Controls>
      <Content>
        {columns.length > 1 && data.length > 1 ? (
          <ReactWindowTable {...{ columns, data }} />
        ) : (
          <NoDataWrapper>
            <h4>No data to show :(</h4>
            <p>Please press "Upload .csv" button to load some...</p>
          </NoDataWrapper>
        )}
      </Content>
    </Root>
  );
};

const NoDataWrapper = styled.div`
  padding: 30px;
  text-align: center;
`;

const Root = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    border-radius: 10px;
    height: inherit;
  }
`;

const Content = styled.div`
  overflow: scroll;
  @media (min-width: 768px) {
    border-radius: 10px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-bottom: 1px solid #dbdbdb;
`;
