import { AppRoot, ContentWrapper } from "./App.styles";

import { DataTable } from "../components/DataTable/";
import React from "react";

export const App = () => {
  return (
    <AppRoot>
      <ContentWrapper>
        <DataTable />
      </ContentWrapper>
    </AppRoot>
  );
};
