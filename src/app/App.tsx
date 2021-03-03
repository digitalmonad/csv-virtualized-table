import { AppRoot, ContentWrapper } from "./App.styles";

import { DataTable } from "../components/DataTable/";
import React from "react";

export const App = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Row Index",
        accessor: (row: any, i: number) => i,
      },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            width: 50,
          },
          {
            Header: "Visits",
            accessor: "visits",
            width: 60,
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = [{}];

  return (
    <AppRoot>
      <ContentWrapper>
        <DataTable />
      </ContentWrapper>
    </AppRoot>
  );
};
