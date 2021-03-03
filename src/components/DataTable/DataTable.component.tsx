import * as utils from "../../utils";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useBlockLayout, useTable } from "react-table";

import { Table } from "../WindowTable";
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
  const columns = React.useMemo(() => preprocessTableColumns(), [tableColumns]);

  const data = React.useMemo(() => preprocessTableRows(), [tableRows]);

  return (
    <Root>
      <Controls>
        <UploadButton onChange={handleFileUpload} />
      </Controls>
      <Content>
        {columns.length > 1 && data.length > 1 ? (
          <Table {...{ columns, data }} />
        ) : (
          <NoDataWrapper>
            No data to show :( Please press "Upload .csv" button to load some...
          </NoDataWrapper>
        )}
      </Content>
    </Root>
  );
};

const NoDataWrapper = styled.div``;

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

  .table {
    display: inline-block;
    border-spacing: 0;
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #dbdbdb;
      border-right: 1px solid #dbdbdb;

      :last-child {
        border-right: 1px solid #dbdbdb;
      }
    }
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-bottom: 1px solid #dbdbdb;
`;
